import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Lock,
  PlayCircle,
  Sigma,
  Sparkles,
  TriangleAlert,
  Video,
} from 'lucide-react';
import { SEMESTERS } from '@/data';
import { COURSE_CATEGORIES, type CourseCategory } from '@/data/courseStructure';
import type {
  DetailedChapter,
  Formula,
  Paper,
  SyllabusPaper,
} from '@/data/types';
import {
  generateGuideWithGemini,
  mockGuide,
  type GeneratedGuide,
} from '@/lib/studyGuide';

const KEY_STORAGE = 'dupo-gemini-key';

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-navy-50/60"
        aria-expanded={open}
      >
        <h3 className="text-sm font-semibold text-navy-900 sm:text-base">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-navy-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="animate-rise border-t border-navy-100 px-5 py-5">{children}</div>
      )}
    </div>
  );
}

function FormulaGrid({ formulas }: { formulas: Formula[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {formulas.map((f) => (
        <div key={f.name} className="rounded-lg border border-amber-200/70 bg-amber-50/60 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">{f.name}</p>
          <p className="formula mt-1 text-sm text-navy-900 sm:text-base">{f.expr}</p>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ icon: Icon, text }: { icon: typeof Sigma; text: string }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy-400">
      <Icon className="h-3.5 w-3.5" /> {text}
    </p>
  );
}

function DetailedChapterBody({ ch }: { ch: DetailedChapter }) {
  return (
    <div className="space-y-5">
      <div>
        <SectionLabel icon={BookOpen} text="Syllabus topics" />
        <ul className="mt-2 space-y-1.5">
          {ch.topics.map((t) => (
            <li key={t} className="flex gap-2 text-sm leading-relaxed text-navy-800">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionLabel icon={GraduationCap} text="Exam-ready professor notes" />
        <div className="mt-2 space-y-2">
          {ch.notes.map((n, i) => (
            <div key={i} className="rounded-lg border-l-4 border-navy-300 bg-navy-50/70 px-4 py-3 text-sm leading-relaxed text-navy-900">
              {n}
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel icon={Sigma} text="Key derivations" />
        <ol className="mt-2 space-y-2">
          {ch.derivations.map((d, i) => (
            <li key={i} className="flex gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-relaxed text-navy-900">
              <span className="shrink-0 font-semibold text-navy-500">{i + 1}.</span>
              <span className="formula">{d}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <SectionLabel icon={Sigma} text="Important formulas" />
        <div className="mt-2">
          <FormulaGrid formulas={ch.formulas} />
        </div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
        <SectionLabel icon={Lightbulb} text="Exam tips" />
        <ul className="mt-2 space-y-1.5">
          {ch.tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-navy-900">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GeneratedGuideView({ guide }: { guide: GeneratedGuide }) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-navy-50 px-4 py-3 text-sm leading-relaxed text-navy-900">{guide.overview}</div>
      {guide.chapters.map((c) => (
        <div key={c.title} className="rounded-xl border border-navy-100 p-4">
          <h4 className="text-sm font-semibold text-navy-900">{c.title}</h4>
          <SectionLabel icon={BookOpen} text="Key revision points" />
          <ul className="mt-2 space-y-1.5">
            {c.keyPoints.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-navy-800">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <SectionLabel icon={Sigma} text="Important formulas" />
            <div className="mt-2 flex flex-wrap gap-2">
              {c.formulas.map((f, i) => (
                <span key={i} className="formula rounded-lg border border-amber-200/70 bg-amber-50/60 px-3 py-1.5 text-sm text-navy-900">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-3">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-navy-900">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {c.examTip}
            </p>
          </div>
        </div>
      ))}
      {guide.flashcards.length > 0 && (
        <div>
          <SectionLabel icon={Sparkles} text="Generated flashcards" />
          <div className="mt-2 space-y-2">
            {guide.flashcards.map((f, i) => (
              <details key={i} className="group rounded-lg border border-navy-100 bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-navy-900 marker:text-amber-500">
                  {f.question}
                </summary>
                <p className="formula mt-2 whitespace-pre-line text-sm leading-relaxed text-navy-800">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GeneratorButton({ paper }: { paper: SyllabusPaper }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<GeneratedGuide | null>(null);

  const run = async () => {
    setError(null);
    setGuide(null);
    setLoading(true);
    try {
      const apiKey = localStorage.getItem(KEY_STORAGE)?.trim() ?? '';
      if (apiKey) {
        setGuide(await generateGuideWithGemini(apiKey, paper));
      } else {
        await new Promise((r) => setTimeout(r, 1200));
        setGuide(mockGuide(paper));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={run}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="flex gap-1">
              <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
              <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
              <span className="think-dot h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-amber-400" />
            Generate Chapter Notes &amp; Flashcards with AI Professor
          </>
        )}
      </button>
      {error && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      {guide && (
        <div className="mt-5 animate-rise">
          <GeneratedGuideView guide={guide} />
        </div>
      )}
    </div>
  );
}

function PaperView({ paper, semesterId }: { paper: Paper; semesterId: number }) {
  return (
    <div className="animate-rise space-y-6">
      <div className="flex flex-col gap-4 rounded-xl bg-navy-900 px-5 py-4 text-white shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-semibold">{paper.code} — {paper.name}</p>
            <p className="text-xs text-navy-200">Semester {semesterId} · Core Discipline Specific Course · NEP UGCF-2022</p>
          </div>
        </div>
        {paper.kind === 'detailed' && (
          <a
            href={paper.playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-amber-400"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Verified Video Lectures
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        )}
      </div>

      {paper.kind === 'detailed' ? (
        <>
          <div className="space-y-3">
            {paper.chapters.map((ch, i) => (
              <Accordion key={ch.title} title={ch.title} defaultOpen={i === 0}>
                <DetailedChapterBody ch={ch} />
              </Accordion>
            ))}
          </div>
          <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
            <SectionLabel icon={Video} text="Watch verified video lectures" />
            <p className="mt-2 text-sm text-navy-500">Complete free playlist for {paper.code}:</p>
            <a
              href={paper.playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex items-center gap-3 rounded-lg border border-navy-200 px-4 py-3 transition hover:border-amber-400 hover:bg-amber-50"
            >
              <PlayCircle className="h-5 w-5 shrink-0 text-red-600" />
              <span className="text-sm font-medium text-navy-800 group-hover:text-amber-700">{paper.playlist.label}</span>
              <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-navy-300" />
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3">
            {paper.chapters.map((ch, i) => (
              <Accordion key={ch.title} title={ch.title} defaultOpen={i === 0}>
                <ul className="space-y-1.5">
                  {ch.topics.map((t) => (
                    <li key={t} className="flex gap-2 text-sm leading-relaxed text-navy-800">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <Sparkles className="h-4 w-4 text-amber-500" />
              AI Study Guide Generator
            </p>
            <p className="mt-1 text-sm leading-relaxed text-navy-600">
              Instantly generate exam-ready chapter notes, key formulas and flashcards for {paper.code}. Uses your Gemini API key if you have added one in the AI Professor Grader tab; otherwise runs on a built-in smart template.
            </p>
            <GeneratorButton paper={paper} />
          </div>
        </>
      )}
    </div>
  );
}

function CourseCategoryView({ cat, semesterId }: { cat: CourseCategory; semesterId: number }) {
  return (
    <div key={cat.id} className="animate-rise space-y-4">
      <div className="flex flex-col gap-3 rounded-xl bg-navy-900 px-5 py-4 text-white shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-semibold">{cat.code} — {cat.name}</p>
            <p className="text-xs text-navy-200">Semester {semesterId} · DU NEP UGCF-2022 degree structure</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-navy-950">
          {cat.credits}
        </span>
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
        <p className="text-sm leading-relaxed text-navy-800">{cat.description}</p>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-navy-400">Typical courses under this category</p>
        <p className="mt-1.5 text-sm leading-relaxed text-navy-900">{cat.examples}</p>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <Lightbulb className="h-4 w-4" /> Credit weightage &amp; study tips (DU NEP rules)
        </p>
        <ul className="mt-2 space-y-1.5">
          {cat.tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-navy-900">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SemesterHub({
  initialSemesterId,
  initialPaperId,
}: {
  initialSemesterId?: number;
  initialPaperId?: string;
} = {}) {
  const [semesterId, setSemesterId] = useState(initialSemesterId ?? 1);
  const [category, setCategory] = useState('dsc');
  const [paperId, setPaperId] = useState(
    initialPaperId ??
      SEMESTERS.find((s) => s.id === (initialSemesterId ?? 1))?.papers[0]?.id ??
      ''
  );

  // Deep links from search / site map
  useEffect(() => {
    if (initialSemesterId !== undefined) {
      setSemesterId(initialSemesterId);
      setCategory('dsc');
      const sem = SEMESTERS.find((s) => s.id === initialSemesterId);
      if (initialPaperId && sem?.papers.some((p) => p.id === initialPaperId)) {
        setPaperId(initialPaperId);
      } else {
        setPaperId(sem?.papers[0]?.id ?? '');
      }
    }
  }, [initialSemesterId, initialPaperId]);
  const semester = useMemo(
    () => SEMESTERS.find((s) => s.id === semesterId) ?? SEMESTERS[0],
    [semesterId]
  );
  const paper = useMemo(
    () =>
      semester.papers.find((p) => p.id === paperId) ??
      semester.papers[0] ??
      null,
    [semester, paperId]
  );
  const activeCategory = category === 'dsc' ? null : COURSE_CATEGORIES[semester.id]?.find((c) => c.id === category) ?? null;

  const handleSemesterChange = (id: number) => {
    const s = SEMESTERS.find((x) => x.id === id);
    if (!s) return;
    setSemesterId(id);
    setCategory('dsc');
    setPaperId(s.papers[0]?.id ?? '');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900">Semester Hub &amp; Notes</h2>
          <p className="mt-1 text-sm text-navy-500">
            Click any chapter to open exam-ready notes, derivations, formulas and tips — aligned to NEP UGCF-2022.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy-500">Semester</span>
            <div className="relative">
              <select
                value={semesterId}
                onChange={(e) => handleSemesterChange(Number(e.target.value))}
                className="w-full appearance-none rounded-lg border border-navy-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-navy-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:w-52"
              >
                {SEMESTERS.map((s) => (
                  <option key={s.id} value={s.id} disabled={!s.active}>
                    {s.label}{!s.active && ' — Coming Soon'}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            </div>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy-500">Core paper</span>
            <div className="relative">
              <select
                value={paper?.id ?? ''}
                disabled={category !== 'dsc'}
                onChange={(e) => setPaperId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-navy-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-navy-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:w-64 disabled:opacity-40"
              >
                {semester.papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code}: {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            </div>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy-500">Course category</span>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border border-navy-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-navy-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:w-56"
              >
                <option value="dsc">DSC — Core Physics</option>
                {(COURSE_CATEGORIES[semester.id] ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            </div>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {semester.papers.map((p) => (
          <button
            key={p.id}
            onClick={() => setPaperId(p.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              p.id === paper?.id
                ? 'bg-navy-800 text-white shadow-card'
                : 'border border-navy-200 bg-white text-navy-600 hover:border-amber-400 hover:text-amber-700'
            }`}
          >
            {p.code}
          </button>
        ))}
        {semester.active && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-2 text-xs font-medium text-amber-700">
            {semester.tagline}
          </span>
        )}
      </div>

      {category !== 'dsc' && activeCategory ? (
        <div className="mt-6">
          <CourseCategoryView cat={activeCategory} semesterId={semester.id} />
        </div>
      ) : semester.active ? (
        paper ? (
          <div key={`${semester.id}-${paper.id}`} className="mt-6">
            <PaperView paper={paper} semesterId={semester.id} />
          </div>
        ) : null
      ) : (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-navy-200 bg-white px-5 py-8 text-center">
          <Lock className="mx-auto h-5 w-5 text-navy-300" />
          <p className="text-sm text-navy-500">
            {semester.label} notes are under construction by the open-source community — check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
