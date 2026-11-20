import { useMemo, useState } from 'react';
import {
  Archive,
  ChevronDown,
  ExternalLink,
  Flame,
  GraduationCap,
  LibraryBig,
  School,
  Search,
  Sparkles,
} from 'lucide-react';
import { PYQ_BANK, type PYQ } from '@/data/pyqBank';

const ARCHIVE_LINKS = [
  {
    name: 'Kalindi College DU PYQ Archive',
    url: 'https://www.kalindicollege.in/previous-year-qpapers/',
    icon: Archive,
    desc: 'Previous year question papers across DU courses',
  },
  {
    name: 'Deshbandhu College Library',
    url: 'https://www.deshbandhucollege.ac.in/library-old-question-papers.php',
    icon: LibraryBig,
    desc: 'Library collection of old question papers',
  },
  {
    name: 'Kirori Mal College',
    url: 'https://kmc.du.ac.in/',
    icon: School,
    desc: 'College question paper repository',
  },
];

const PAPER_BADGES: Record<string, string> = {
  'DSC-1': 'bg-navy-100 text-navy-700',
  'DSC-2': 'bg-emerald-100 text-emerald-700',
  'DSC-3': 'bg-amber-100 text-amber-700',
  'DSC-4': 'bg-sky-100 text-sky-700',
  'DSC-5': 'bg-rose-100 text-rose-700',
  'DSC-6': 'bg-teal-100 text-teal-700',
  'DSC-7': 'bg-violet-100 text-violet-700',
  'DSC-8': 'bg-orange-100 text-orange-700',
  'DSC-9': 'bg-cyan-100 text-cyan-700',
  'DSC-10': 'bg-lime-100 text-lime-700',
  'DSC-11': 'bg-indigo-100 text-indigo-700',
  'DSC-12': 'bg-fuchsia-100 text-fuchsia-700',
  'DSC-13': 'bg-emerald-100 text-emerald-700',
  'DSC-14': 'bg-blue-100 text-blue-700',
  'DSC-15': 'bg-red-100 text-red-700',
  'DSC-16': 'bg-sky-100 text-sky-700',
  'DSC-17': 'bg-amber-100 text-amber-700',
  'DSC-18': 'bg-rose-100 text-rose-700',
};

function PYQCard({ pyq, onPractice }: { pyq: PYQ; onPractice: (pyq: PYQ) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-navy-100 bg-white shadow-card transition hover:shadow-card-hover">
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PAPER_BADGES[pyq.paper]}`}>
            {pyq.paper}
          </span>
          <span className="text-[11px] font-medium text-navy-400">{pyq.paperName}</span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
            <Flame className="h-3 w-3" />
            Asked {pyq.frequency}× in DU
          </span>
          <span className="rounded-full bg-navy-100 px-2.5 py-0.5 text-[11px] font-medium text-navy-600">
            {pyq.marks} Marks
          </span>
        </div>

        <p className="formula text-sm font-medium leading-relaxed text-navy-900">{pyq.question}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-amber-400 hover:text-amber-700"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            {open ? 'Hide DU Solution' : 'View Step-by-Step DU Solution'}
          </button>
          <button
            onClick={() => onPractice(pyq)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white shadow-card transition hover:bg-navy-700"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            Practice this PYQ with AI Professor
          </button>
        </div>

        {open && (
          <div className="animate-rise mt-1 rounded-lg border border-navy-100 bg-navy-50/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
              Step-by-step DU solution
            </p>
            <div className="mt-2 space-y-1.5">
              {pyq.solution.map((line, i) => (
                <p key={i} className="formula flex gap-2 text-sm leading-relaxed text-navy-900">
                  <span className="shrink-0 font-semibold text-amber-600">{i + 1}.</span>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PYQBank({ onPractice }: { onPractice: (pyq: PYQ) => void }) {
  const [semester, setSemester] = useState<number | 'all'>('all');
  const [paper, setPaper] = useState<string>('all');
  const [query, setQuery] = useState('');

  const paperOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const q of PYQ_BANK) seen.set(q.paper, q.paperName);
    return [...seen.entries()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PYQ_BANK.filter((pyq) => {
      if (semester !== 'all' && pyq.semester !== semester) return false;
      if (paper !== 'all' && pyq.paper !== paper) return false;
      if (!q) return true;
      const haystack = [pyq.question, pyq.paper, pyq.paperName, ...pyq.keywords].join(' ').toLowerCase();
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [semester, paper, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-300">
          <GraduationCap className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900">DU PYQ Bank</h2>
          <p className="text-sm text-navy-500">
            Authentic Delhi University previous year questions with step-by-step solutions — Semesters 1 to 6.
          </p>
        </div>
      </div>

      {/* Official DU archive links */}
      <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-sky-900">
          <Archive className="h-4 w-4" />
          Official DU Question Paper Archives
        </p>
        <p className="mt-1 text-xs leading-relaxed text-sky-800/80">
          Download full original papers from these Delhi University college repositories:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {ARCHIVE_LINKS.map(({ name, url, icon: Icon, desc }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-sky-200 bg-white p-3 transition hover:border-sky-400 hover:shadow-card"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-xs font-semibold text-sky-900">
                  {name}
                  <ExternalLink className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-navy-500">{desc}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[132px] z-10 mt-6 flex flex-col gap-3 rounded-xl border border-navy-100 bg-white/95 p-4 shadow-card backdrop-blur md:flex-row md:items-center">
        <label className="flex items-center gap-2 text-sm">
          <span className="shrink-0 font-medium text-navy-500">Semester</span>
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value === 'all' ? 'all' : Number(e.target.value));
              setPaper('all');
            }}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <option key={s} value={s}>Sem {s}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="shrink-0 font-medium text-navy-500">Paper</span>
          <select
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            <option value="all">All Papers</option>
            {paperOptions.map(([code, name]) => (
              <option key={code} value={code}>{code}: {name}</option>
            ))}
          </select>
        </label>
        <label className="relative flex flex-1 items-center">
          <Search className="absolute left-3 h-4 w-4 text-navy-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic or keyword — Coriolis, Gauss, Carnot, Schrodinger, Maxwell…"
            className="w-full rounded-lg border border-navy-200 bg-white py-2 pl-9 pr-3 text-sm text-navy-900 placeholder:text-navy-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </label>
      </div>

      {/* Results */}
      <p className="mt-4 text-xs font-medium text-navy-400">
        {filtered.length} question{filtered.length === 1 ? '' : 's'} found
      </p>
      <div className="mt-2 space-y-4">
        {filtered.map((pyq) => (
          <PYQCard key={pyq.id} pyq={pyq} onPractice={onPractice} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-navy-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-navy-600">No PYQs match your filters.</p>
            <p className="mt-1 text-xs text-navy-400">Try a broader keyword (e.g. “oscillator”, “interference”, “quantum”) or clear the semester/paper filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
