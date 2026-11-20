export type GradeResult = {
  score: number;
  dimensionCheck: string;
  missingSteps: string[];
  modelAnswer: string;
  feedback: string;
};

const SYSTEM_PROMPT = `You are a strict but encouraging Delhi University Physics Professor grading B.Sc. (Hons.) Physics students on the NEP UGCF-2022 curriculum. Grade the student's answer to the given question.

Rules:
- Score the answer out of 10, in whole or half marks, the way a DU end-semester evaluator would (step marks for method, deductions for missing diagrams/units/boundary conditions).
- Check dimensional consistency of every formula the student used and report it.
- List every missing derivation step, boundary condition, assumption (e.g. small-angle approximation) or conceptual error. Use an empty array if genuinely nothing is missing.
- Provide the ideal model answer as you would write on the DU model answer sheet, concise but complete.
- Be strict in scoring but warm and encouraging in feedback. Reply in English.

Respond ONLY with JSON matching this shape:
{"score": number, "dimensionCheck": string, "missingSteps": string[], "modelAnswer": string, "feedback": string}`;

function extractJson(text: string): GradeResult {
  const cleaned = text.replace(/```json\s*|```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return {
    score: Number(parsed.score) || 0,
    dimensionCheck: String(parsed.dimensionCheck ?? 'Not reported.'),
    missingSteps: Array.isArray(parsed.missingSteps) ? parsed.missingSteps.map(String) : [],
    modelAnswer: String(parsed.modelAnswer ?? ''),
    feedback: String(parsed.feedback ?? ''),
  };
}

export async function gradeWithGemini(
  apiKey: string,
  paper: string,
  question: string,
  answer: string
): Promise<GradeResult> {
  const userContent = `Paper: ${paper}
Question: ${question}

Student's answer:
${answer}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: userContent }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 400 || res.status === 403) {
      throw new Error('Your API key was rejected. Please check it and try again.');
    }
    throw new Error(`Gemini request failed (${res.status}). ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('The AI returned an empty response. Please try again.');
  }
  return extractJson(text);
}

export function mockGrade(paper: string, question: string, answer: string): GradeResult {
  const trimmed = answer.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const hasFormula = /[=√∑∫π²θ]|d[xv]/i.test(trimmed);
  const hasSteps = /first|then|next|hence|therefore|so|⇒|→|step/i.test(trimmed);
  const hasUnits = /m\/s|kg|N |joule|newton|rad|Hz|second|metre|meter/i.test(trimmed);

  const missing: string[] = [];
  if (!hasFormula) missing.push('No governing equation was written — always start from the fundamental relation (Newton’s law, energy conservation, wave equation, etc.).');
  if (!hasSteps) missing.push('The logical flow between steps is not spelled out. DU evaluators award step marks; connect each line with a “therefore” or a stated principle.');
  if (!hasUnits) missing.push('No units or dimensional check appears in the answer. Verify the dimensions of your final expression before boxing it.');
  if (wordCount < 40) missing.push('The answer is quite short for this mark weight — expand the derivation and state assumptions (e.g. small-angle approximation, neglecting friction).');
  if (missing.length === 0) missing.push('Minor: add a labelled diagram and a one-line physical interpretation at the end to secure full marks.');

  const base = hasFormula && hasSteps ? 6 : 3.5;
  const bonus = hasUnits ? 1 : 0;
  const lengthBonus = wordCount >= 120 ? 1.5 : wordCount >= 60 ? 0.5 : 0;
  const score = Math.min(9, Math.round((base + bonus + lengthBonus) * 2) / 2);

  return {
    score,
    dimensionCheck: hasFormula
      ? 'The expressions you used appear dimensionally consistent at a glance. In an exam, state the dimensional check explicitly (e.g. [T/μ] = m²/s² ⇒ √(T/μ) is a speed) to earn the method mark.'
      : 'I could not find a formula to check — a key equation with its dimensional consistency must be shown for full marks.',
    missingSteps: missing,
    modelAnswer:
      'This is demo mode, so no paper-specific model answer was generated. Enter your free Google Gemini API key (from Google AI Studio) and the AI Professor will write the full ideal derivation for this exact question, matched to the DU marking scheme.',
    feedback: `Demo evaluation of your ${wordCount}-word answer for ${paper} (demo mode — scores are approximate and use only this text). Your structure is ${hasSteps ? 'clear' : 'unclear'} and formula use is ${hasFormula ? 'present' : 'missing'}. ${score >= 7 ? 'Solid attempt — polish the presentation and you will reach full marks.' : 'Good starting point — add the missing elements listed above and re-attempt.'}`,
  };
}
