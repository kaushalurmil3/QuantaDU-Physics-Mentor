import { useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Lock,
  PlayCircle,
  Sigma,
  Video,
} from 'lucide-react';
import { SEMESTERS } from '@/data/semesterData';

type Unit = (typeof SEMESTERS)[number]['papers'][number]['units'][number];

function FormulaCard({ name, expr }: { name: string; expr: string }) {
  return (
    <div className="rounded-lg border border-amber-200/70 bg-amber-50/60 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">{name}</p>
      <p className="formula mt-1 text-sm text-navy-900 sm:text-base">{expr}</p>
    </div>
  );
}

function UnitSection({ unit }: { unit: Unit }) {
  return (
    <section className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
      <header className="border-b border-navy-100 bg-navy-50/60 px-5 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <BookOpen className="h-4 w-4 text-navy-500" />
          {unit.title}
        </h3>
      </header>

      <div className="space-y-5 px-5 py-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Syllabus topics</p>
          <ul className="mt-2 space-y-1.5">
            {unit.topics.map((t) => (
              <li key={t} className="flex gap-2 text-sm leading-relaxed text-navy-800">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Professor notes</p>
          <div className="mt-2 space-y-2">
            {unit.notes.map((n, i) => (
              <div key={i} className="rounded-lg border-l-4 border-navy-300 bg-navy-50/70 px-4 py-3 text-sm leading-relaxed text-navy-900">
                {n}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy-400">
            <Sigma className="h-3.5 w-3.5" /> Key formulas
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {unit.formulas.map((f) => (
              <FormulaCard key={f.name} name={f.name} expr={f.expr} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Standard DU textbook references</p>
          <ul className="mt-2 space-y-1 text-sm text-navy-800">
            {unit.references.map((r) => (
              <li key={r} className="font-serif italic">— {r}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy-400">
            <Video className="h-3.5 w-3.5" /> Curated free video lectures
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {unit.videos.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700"
              >
                <PlayCircle className="h-4 w-4 text-navy-400 transition group-hover:text-amber-500" />
                {v.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SemesterHub() {
  const activeSemesters = SEMESTERS.filter((s) => s.active);
  const [semesterId, setSemesterId] = useState(activeSemesters[0].id);
  const semester = useMemo(
    () => SEMESTERS.find((s) => s.id === semesterId) ?? activeSemesters[0],
    [semesterId]
  );
  const [paperId, setPaperId] = useState(semester.papers[0].id);
  const paper = useMemo(
    () => semester.papers.find((p) => p.id === paperId) ?? semester.papers[0],
    [semester, paperId]
  );

  const handleSemesterChange = (id: number) => {
    const s = SEMESTERS.find((x) => x.id === id);
    if (!s || !s.active) return;
    setSemesterId(id);
    setPaperId(s.papers[0].id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900">Semester Hub &amp; Notes</h2>
          <p className="mt-1 text-sm text-navy-500">
            Unit-wise notes, key formulas, textbook references and curated video lectures — aligned to NEP UGCF-2022.
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
                value={paperId}
                onChange={(e) => setPaperId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-navy-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-navy-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:w-60"
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
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {semester.papers.map((p) => (
          <button
            key={p.id}
            onClick={() => setPaperId(p.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              p.id === paperId
                ? 'bg-navy-800 text-white shadow-card'
                : 'border border-navy-200 bg-white text-navy-600 hover:border-amber-400 hover:text-amber-700'
            }`}
          >
            {p.code}
            <span className="ml-2 hidden sm:inline">{p.name}</span>
          </button>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-navy-200 px-4 py-2 text-sm text-navy-400">
          <Lock className="h-3.5 w-3.5" /> More papers soon
        </span>
      </div>

      <div key={paper.id} className="mt-6 animate-rise space-y-6">
        <div className="flex items-center gap-3 rounded-xl bg-navy-900 px-5 py-4 text-white shadow-card">
          <GraduationCap className="h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-semibold">{paper.code} — {paper.name}</p>
            <p className="text-xs text-navy-200">Semester {semester.id} · Core Discipline Specific Course · UGCF-2022</p>
          </div>
        </div>
        {paper.units.map((u) => (
          <UnitSection key={u.title} unit={u} />
        ))}
      </div>
    </div>
  );
}
