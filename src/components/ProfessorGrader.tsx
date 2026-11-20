import { useMemo, useState } from 'react';
import {
  Bot,
  KeyRound,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { gradeWithGemini, mockGrade, type GradeResult } from '@/lib/grader';

const KEY_STORAGE = 'dupo-gemini-key';

type QuestionOption = { paper: string; label: string; question: string };

const QUESTION_BANK: QuestionOption[] = [
  {
    paper: 'DSC-2: Mechanics',
    label: 'Q1 (4m) — Inertial frames and gravity',
    question:
      'Can an inertial frame of reference exist in the presence of gravity? Justify your answer with reference to Newton’s first law.',
  },
  {
    paper: 'DSC-2: Mechanics',
    label: 'Q6 (14m) — Shell theorem & field inside a sphere',
    question:
      'State the shell theorem. Derive the gravitational field at a point outside and inside a thin uniform spherical shell, hence the field inside a uniform solid sphere.',
  },
  {
    paper: 'DSC-2: Mechanics',
    label: 'Q7 (14m) — Sphere rolling down an incline',
    question:
      'Derive the moment of inertia of a uniform solid sphere about a diameter, and show a rolling sphere accelerates at (5/7)g sinθ down an incline.',
  },
  {
    paper: 'DSC-3: Waves and Oscillations',
    label: 'Q1 (14m) — SHM equation, solution and energy',
    question:
      'Derive the equation of motion and solution for a mass on a spring performing SHM, and show the total energy is ½kA².',
  },
  {
    paper: 'DSC-3: Waves and Oscillations',
    label: 'Q3 (14m) — Speed of a wave on a string',
    question: 'Derive the speed of a transverse wave on a stretched string, v = √(T/μ).',
  },
  {
    paper: 'DSC-1: Mathematical Physics I',
    label: 'Q2 (14m) — Physical meaning of divergence and curl',
    question:
      'Give the physical meaning of divergence and curl of a vector field with one example each, and state the divergence theorem and Stokes theorem.',
  },
];

export default function ProfessorGrader() {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(KEY_STORAGE) ?? '');
  const [rememberKey, setRememberKey] = useState(() => !!localStorage.getItem(KEY_STORAGE));
  const [showKey, setShowKey] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);

  const selected = QUESTION_BANK[qIndex];
  const demoMode = !apiKey.trim();
  const scoreColor = useMemo(() => {
    if (!result) return '';
    if (result.score >= 8) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (result.score >= 5) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-red-600 border-red-200 bg-red-50';
  }, [result]);

  const handleGrade = async () => {
    setError(null);
    setResult(null);
    setGrading(true);
    try {
      if (demoMode) {
        await new Promise((r) => setTimeout(r, 1400));
        setResult(mockGrade(selected.paper, selected.question, answer));
      } else {
        const res = await gradeWithGemini(apiKey.trim(), `${selected.paper} — ${selected.label}`, selected.question, answer);
        setResult(res);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while grading. Please try again.');
    } finally {
      setGrading(false);
    }
  };

  const handleKeyChange = (value: string) => {
    setApiKey(value);
    if (rememberKey) localStorage.setItem(KEY_STORAGE, value.trim());
    else localStorage.removeItem(KEY_STORAGE);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-900">AI Professor Grader</h2>
      <p className="mt-1 text-sm text-navy-500">
        Type your derivation or paste your answer steps, and get graded the way a strict Delhi University Physics Professor would.
      </p>

      {/* API key panel */}
      <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <KeyRound className="h-4 w-4 text-amber-500" />
          Google Gemini API key
          <span className="ml-1 rounded-full bg-navy-100 px-2 py-0.5 text-[11px] font-medium text-navy-500">
            optional
          </span>
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              placeholder="Paste your free Gemini API key (from Google AI Studio)"
              className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-4 pr-16 text-sm text-navy-900 placeholder:text-navy-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              autoComplete="off"
            />
            <button
              onClick={() => setShowKey((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-navy-400 hover:text-navy-600"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-600">
            <input
              type="checkbox"
              checked={rememberKey}
              onChange={(e) => {
                setRememberKey(e.target.checked);
                if (e.target.checked && apiKey.trim()) localStorage.setItem(KEY_STORAGE, apiKey.trim());
                else localStorage.removeItem(KEY_STORAGE);
              }}
              className="h-4 w-4 rounded border-navy-300 text-navy-700 focus:ring-amber-300"
            />
            Remember on this device
          </label>
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-navy-400">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
          Your key is stored only in your own browser (this device) and is sent only to Google’s Gemini API. Without a key, the app runs in mock demo mode with approximate grading.
        </p>
      </div>

      {/* Grading form */}
      <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy-500">Paper</span>
            <input
              readOnly
              value={selected.paper}
              className="w-full cursor-default rounded-lg border border-navy-200 bg-navy-50/60 px-4 py-2.5 text-sm font-medium text-navy-800"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy-500">Question</span>
            <select
              value={qIndex}
              onChange={(e) => {
                setQIndex(Number(e.target.value));
                setResult(null);
                setError(null);
              }}
              className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {QUESTION_BANK.map((q, i) => (
                <option key={q.label} value={i}>{q.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 rounded-lg bg-navy-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Question text</p>
          <p className="formula mt-1 text-sm text-navy-900">{selected.question}</p>
        </div>

        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-medium text-navy-500">Your answer / derivation steps</span>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder={'Write your derivation step by step, e.g.\nF = -kx (Hooke\'s law)\nmx\'\' + kx = 0\nω = √(k/m) ⇒ x = A sin(ωt + φ) …'}
            className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm leading-relaxed text-navy-900 placeholder:text-navy-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            {demoMode ? (
              <span className="inline-flex items-center gap-1.5 text-amber-600">
                <Bot className="h-3.5 w-3.5" /> Mock demo mode — no key entered
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-600">
                <Sparkles className="h-3.5 w-3.5" /> Gemini grading enabled
              </span>
            )}
          </p>
          <button
            onClick={handleGrade}
            disabled={grading || !answer.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {grading ? (
              <>
                <span className="flex gap-1">
                  <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
                  <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
                  <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
                </span>
                Evaluating…
              </>
            ) : (
              <>
                <Bot className="h-4 w-4" /> Grade My Answer
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm leading-relaxed text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 animate-rise space-y-4 rounded-xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Professor’s verdict</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-navy-800">{result.feedback}</p>
            </div>
            <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-2 ${scoreColor}`}>
              <span className="text-2xl font-bold">{result.score}</span>
              <span className="text-[11px] font-medium">out of 10</span>
            </div>
          </div>

          <div className="rounded-lg border border-navy-100 bg-navy-50/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Dimensional consistency check</p>
            <p className="mt-1 text-sm leading-relaxed text-navy-900">{result.dimensionCheck}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Missing steps / boundary conditions</p>
            <ul className="mt-2 space-y-1.5">
              {result.missingSteps.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-navy-900">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              <Lightbulb className="h-3.5 w-3.5" /> Ideal model answer
            </p>
            <p className="formula mt-2 whitespace-pre-line text-sm leading-relaxed text-navy-900">{result.modelAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
