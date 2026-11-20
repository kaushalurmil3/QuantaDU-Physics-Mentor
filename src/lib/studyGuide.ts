import type { SyllabusPaper } from '@/data/types';

export type GeneratedGuide = {
  overview: string;
  chapters: { title: string; keyPoints: string[]; formulas: string[]; examTip: string }[];
  flashcards: { question: string; answer: string }[];
};

const SYSTEM_PROMPT = `You are a Delhi University Physics Professor creating exam-ready study material for B.Sc. (Hons.) Physics students (NEP UGCF-2022 curriculum).

Given a paper code, paper name, and a list of chapter titles with syllabus topics, produce concise study notes: for each chapter give 4-6 key revision points, the 3-5 most important formulas (in plain text with unicode symbols, e.g. "E = hν", "v = √(T/μ)"), and one exam tip. Also write 4 flashcards (question + step-by-step answer) covering the most examinable ideas. Keep language clear, precise and encouraging.

Respond ONLY with JSON matching this shape:
{"overview": string, "chapters": [{"title": string, "keyPoints": string[], "formulas": string[], "examTip": string}], "flashcards": [{"question": string, "answer": string}]}`;

function promptFor(paper: SyllabusPaper): string {
  const chapterLines = paper.chapters
    .map((c) => `- ${c.title}: ${c.topics.join('; ')}`)
    .join('\n');
  return `Paper: ${paper.code} — ${paper.name} (DU B.Sc. Hons. Physics, NEP UGCF-2022)\nChapters:\n${chapterLines}`;
}

function extractJson(text: string): GeneratedGuide {
  const cleaned = text.replace(/```json\s*|```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return {
    overview: String(parsed.overview ?? ''),
    chapters: Array.isArray(parsed.chapters)
      ? parsed.chapters.map((c: Record<string, unknown>) => ({
          title: String(c.title ?? ''),
          keyPoints: Array.isArray(c.keyPoints) ? c.keyPoints.map(String) : [],
          formulas: Array.isArray(c.formulas) ? c.formulas.map(String) : [],
          examTip: String(c.examTip ?? ''),
        }))
      : [],
    flashcards: Array.isArray(parsed.flashcards)
      ? parsed.flashcards.map((f: Record<string, unknown>) => ({
          question: String(f.question ?? ''),
          answer: String(f.answer ?? ''),
        }))
      : [],
  };
}

export async function generateGuideWithGemini(
  apiKey: string,
  paper: SyllabusPaper
): Promise<GeneratedGuide> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: promptFor(paper) }] }],
        generationConfig: { temperature: 0.4, responseMimeType: 'application/json' },
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 400 || res.status === 403) {
      throw new Error('Your API key was rejected. Please check it and try again.');
    }
    throw new Error(`Gemini request failed (${res.status}).`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('The AI returned an empty response. Please try again.');
  return extractJson(text);
}

const TEMPLATES: Record<string, { signal: string; formulaBank: string[] }> = {
  'Mathematical Physics': {
    signal:
      'This paper builds the mathematical toolbox for every later physics course: transforms, special functions, PDEs and variational methods. Prioritise working through solved derivations by hand.',
    formulaBank: [
      'Fourier series: f(x) = a₀/2 + Σ (aₙ cos nx + bₙ sin nx)',
      'Cauchy–Riemann: ∂u/∂x = ∂v/∂y, ∂u/∂y = −∂v/∂x',
      'Residue theorem: ∮ f(z) dz = 2πi Σ Res(f, zₖ)',
      'Euler–Lagrange: d/dx(∂L/∂y′) − ∂L/∂y = 0',
      'Heat equation: ∂T/∂t = D ∂²T/∂x²',
    ],
  },
  Electricity: {
    signal:
      'Maxwell’s equations are the spine of this paper: derive everything else (wave equation, energy flow, boundary conditions) from them and the course compresses to a page.',
    formulaBank: [
      'Gauss’s law: ∮ E·dA = q_enc/ε₀',
      'Ampère–Maxwell law: ∇×B = μ₀J + μ₀ε₀ ∂E/∂t',
      'Faraday’s law: ∮ E·dl = −dΦ_B/dt',
      'Poynting vector: S = (1/μ₀) E×B',
      'Series resonance: ω₀ = 1/√(LC), Q = ω₀L/R',
    ],
  },
  Circuit: {
    signal:
      'Circuit analysis is pattern recognition: reduce networks with Thevenin/Norton, then handle dynamics with Laplace transforms. Practise transient problems until the RC/RL time constants feel automatic.',
    formulaBank: [
      'Thevenin: V_th = open-circuit voltage, R_th = resistance seen from terminals',
      'RC transient: q(t) = CV(1 − e^{−t/RC})',
      'Impedance: Z = √(R² + (X_L − X_C)²)',
      'Resonance frequency: f₀ = 1/(2π√(LC))',
      'Maximum power transfer: R_load = R_source',
    ],
  },
  Thermal: {
    signal:
      'Thermodynamics rewards clean bookkeeping of state variables. Learn the four potentials and their natural variables; Maxwell relations then fall out as table lookups rather than memory tests.',
    formulaBank: [
      'First law: dQ = dU + dW',
      'Entropy change (reversible): dS = dQ/T',
      'Carnot efficiency: η = 1 − T_cold/T_hot',
      'Maxwell–Boltzmann: f(v) ∝ v² e^{−mv²/2kT}',
      'Planck’s law: ρ(ν) = (8πhν³/c³) / (e^{hν/kT} − 1)',
    ],
  },
  Light: {
    signal:
      'Optics here is superposition applied relentlessly: interference, diffraction and polarisation are all coherence plus path-difference bookkeeping. Always convert geometry to a path difference first.',
    formulaBank: [
      'Fringe width (double slit): β = λD/d',
      'Single-slit minima: a sinθ = mλ',
      'Bragg’s law: 2d sinθ = nλ',
      'Malus’ law: I = I₀ cos²θ',
      'de Broglie wavelength: λ = h/p',
    ],
  },
  Modern: {
    signal:
      'Modern physics hangs on two anchors: the postulates of relativity and the Schrödinger equation. Most questions are these two applied carefully to concrete potentials or kinematics.',
    formulaBank: [
      'Schrödinger (time-independent): −(ħ²/2m)ψ″ + Vψ = Eψ',
      'Infinite well energies: Eₙ = n²h²/8mL²',
      'Tunnelling: T ≈ e^{−2κL}, κ = √(2m(V₀−E))/ħ',
      'Binding energy: B = Δm c²',
      'Radioactive decay: N(t) = N₀e^{−λt}',
    ],
  },
  'Solid State': {
    signal:
      'Solid state physics is symmetry plus statistics: crystal symmetry fixes allowed reflections; Fermi–Dirac statistics fixes electron behaviour. Keep band diagrams at hand for every answer.',
    formulaBank: [
      'Bragg condition: 2d sinθ = nλ',
      'Fermi energy (3D free electrons): E_F = (ħ²/2m)(3π²n)^{2/3}',
      'Hall voltage: V_H = IB/(ne t)',
      'Curie law: χ = C/T',
      'Energy gap: E ≈ hc/λ (photoconductivity threshold)',
    ],
  },
  Analog: {
    signal:
      'Treat every circuit as a transfer function: diode and transistor characteristics are just input–output maps. Bias point stability is the repeated hidden question in every amplifier problem.',
    formulaBank: [
      'Diode (ideal) rectifier: V_dc = V_peak/π (half-wave)',
      'Transistor: I_C = β I_B',
      'Op-amp inverting gain: A = −R_f/R_in',
      'Wien bridge oscillator: f = 1/(2πRC)',
      '555 astable: T = 0.693(R₁ + 2R₂)C',
    ],
  },
  Electromagnetic: {
    signal:
      'At this level EM is Maxwell’s equations in vector calculus, full time: potentials, retarded solutions and boundary conditions. Fluency with ∇, ∇·, ∇× in all coordinate systems is non-negotiable.',
    formulaBank: [
      'Wave equation (vacuum): ∇²E = (1/c²) ∂²E/∂t²',
      'Method of images: replace conductor boundary with mirror charge',
      'Fresnel equations: r⊥ = (n₁cosθᵢ − n₂cosθ_t)/(n₁cosθᵢ + n₂cosθ_t)',
      'Larmor formula: P = q²a²/(6πε₀c³)',
      'Lorentz force: F = q(E + v×B)',
    ],
  },
  Quantum: {
    signal:
      'Formalism first: master bra-ket notation and the operator algebra early, because every later problem (oscillator, hydrogen, spin) is the same framework with different operators.',
    formulaBank: [
      'Commutator: [x̂, p̂] = iħ',
      'Harmonic oscillator: Eₙ = (n + ½)ħω',
      'Uncertainty: Δx Δp ≥ ħ/2',
      'Angular momentum: L² = l(l+1)ħ², L_z = mħ',
      'Hydrogen energies: Eₙ = −13.6 eV/n²',
    ],
  },
  Digital: {
    signal:
      'Digital electronics is logic plus timing: minimise combinational logic with K-maps, then chain flip-flops for memory. Draw the timing diagram before the circuit — never after.',
    formulaBank: [
      'De Morgan’s theorems: (A·B)′ = A′ + B′, (A + B)′ = A′·B′',
      'K-map grouping: groups of 2ⁿ adjacent 1s',
      'Flip-flop characteristic: Q(next) = D (edge-triggered)',
      'Mod-N counter: N flip-flops count 2ⁿ states',
      'Resolution (n-bit DAC): V_step = V_ref/2ⁿ',
    ],
  },
  Statistical: {
    signal:
      'Statistical mechanics: count microstates, then maximise entropy. All three distributions (MB, BE, FD) come from one counting argument with different occupancy rules.',
    formulaBank: [
      'Boltzmann: P(Eᵢ) = e^{−Eᵢ/kT}/Z',
      'Partition function: Z = Σ e^{−Eᵢ/kT}',
      'Fermi–Dirac: f(E) = 1/(e^{(E−EF)/kT} + 1)',
      'Bose–Einstein: f(E) = 1/(e^{(E−μ)/kT} − 1)',
      'Entropy: S = k ln Ω',
    ],
  },
  Atomic: {
    signal:
      'Atomic physics: the Schrödinger solution of hydrogen plus small corrections (fine structure, Zeeman). Spectra questions are bookkeeping of quantum numbers n, l, m, s and selection rules.',
    formulaBank: [
      'Rydberg: 1/λ = R(1/n₁² − 1/n₂²)',
      'Zeeman shift: ΔE = μ_B B m_j',
      'Fine structure: ΔE ∝ α² E_n',
      'Selection rules: Δl = ±1, Δm = 0, ±1',
      'Einstein coefficients: A/B ratio from Planck law',
    ],
  },
  Nuclear: {
    signal:
      'Nuclear physics: binding energy trends, decay statistics and conservation laws carry most marks. Learn the semi-empirical mass formula term by term — each term is a physical story.',
    formulaBank: [
      'Semi-empirical mass formula: B = a_vA − a_sA^{2/3} − a_cZ(Z−1)/A^{1/3} − a_a(A−2Z)²/A ± δ',
      'Decay: N = N₀e^{−λt}, t₁/₂ = ln2/λ',
      'Q-value: Q = (m_initial − m_final)c²',
      'Fusion (pp chain): 4p → He⁴ + 2e⁺ + 2ν + 26.7 MeV',
      'Radius: R = 1.2 A^{1/3} fm',
    ],
  },
};

export function mockGuide(paper: SyllabusPaper): GeneratedGuide {
  const key = Object.keys(TEMPLATES).find((k) => paper.name.includes(k));
  const t = key
    ? TEMPLATES[key]
    : { signal: 'Focus on derivations and solved numericals; the syllabus chapters below map directly to exam sections.', formulaBank: ['Practice writing each governing equation from memory', 'Verify dimensions of every final result', 'Sketch a diagram for every problem'] };

  return {
    overview: `${paper.code} (${paper.name}): ${t.signal} This is a smart template guide — add your free Google Gemini API key in the AI Professor Grader tab and regenerate for a full personalised, paper-specific set of notes.`,
    chapters: paper.chapters.map((c, i) => ({
      title: c.title,
      keyPoints: [
        `Core scope: ${c.topics.slice(0, 2).join('; ')}.`,
        `Also revise: ${c.topics.slice(2).join('; ') || 'related solved examples from standard DU texts'}.`,
        'Work at least one past-year question for this chapter under exam timing.',
        'Write the governing equations once from memory, then check against notes.',
      ],
      formulas: t.formulaBank.slice(i % 3, (i % 3) + 3),
      examTip: `For "${c.title}", marks sit in the derivation steps: state assumptions, keep units, and end with a one-line physical interpretation.`,
    })),
    flashcards: paper.chapters.slice(0, 4).map((c) => ({
      question: `What are the key examinable ideas of "${c.title}" (${paper.code})?`,
      answer: c.topics.map((tp) => `• ${tp}`).join('\n'),
    })),
  };
}
