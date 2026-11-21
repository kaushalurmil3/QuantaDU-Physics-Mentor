import { BookOpen, ChevronRight, FileText, FlaskConical, GraduationCap, Layers, Map, MonitorPlay, Trophy, X } from 'lucide-react';
import { SEMESTERS } from '@/data/semesterData';
import type { SearchTab } from '@/data/searchIndex';

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: SearchTab, semester?: number, paperId?: string) => void;
};

export default function SiteMapModal({ open, onClose, onNavigate }: Props) {
  if (!open) return null;

  const tabs: { tab: SearchTab; label: string; icon: typeof BookOpen; desc: string }[] = [
    { tab: 'flashcards', label: 'Interactive Flashcards', icon: Layers, desc: '40 flip cards, Semesters 1–6' },
    { tab: 'papers', label: 'DU Sample Papers', icon: FileText, desc: 'Full mock end-sem papers with solutions' },
    { tab: 'pyq', label: 'PYQ Bank', icon: GraduationCap, desc: 'High-frequency DU previous year questions' },
    { tab: 'lab', label: 'Practicals & Lab Hub', icon: FlaskConical, desc: 'Marks breakdown, experiments, viva prep' },
    { tab: 'grader', label: 'AI Professor Grader', icon: Trophy, desc: 'Get your answers graded by AI' },
    { tab: 'resources', label: 'Online Resources & Book Roadmap', icon: MonitorPlay, desc: 'NPTEL, MIT OCW, textbooks & buying guide' },
  ];

  const extras: { label: string; desc: string; tab: SearchTab }[] = [
    {
      label: 'Online Resources',
      desc: 'NPTEL, MIT OCW (8.01/8.02/8.03), Feynman Lectures, OpenStax, Google Colab & SciPy tutorials',
      tab: 'resources',
    },
    {
      label: 'Book Roadmap',
      desc: 'Semester-wise textbook guide with BUY / BORROW / REFERENCE tags and AI Professor ratings',
      tab: 'resources',
    },
    {
      label: 'Official DU Syllabus PDFs',
      desc: 'NEP UGCF-2022 syllabi on du.ac.in and the Physics Department revised syllabi',
      tab: 'resources',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-rise my-8 w-full max-w-3xl rounded-2xl border border-navy-100 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
          <p className="flex items-center gap-2 text-base font-semibold text-navy-900">
            <Map className="h-5 w-5 text-amber-500" />
            Site Map — everything on DU Physics Mentor
          </p>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-navy-400 transition hover:bg-navy-100 hover:text-navy-700"
            aria-label="Close site map"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Semesters 1–6 */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
              Semester Hub &amp; Notes (Core DSC papers)
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {SEMESTERS.filter((s) => s.active).map((sem) => (
                <div key={sem.id} className="rounded-lg border border-navy-100 bg-navy-50/60 p-3">
                  <button
                    onClick={() => onNavigate('hub', sem.id)}
                    className="flex w-full items-center gap-2 text-left text-sm font-semibold text-navy-900 transition hover:text-amber-700"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-amber-500" />
                    Semester {sem.id}
                  </button>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 pl-5">
                    {sem.papers.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onNavigate('hub', sem.id, p.id)}
                        className="rounded-full border border-navy-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-navy-600 transition hover:border-amber-400 hover:text-amber-700"
                      >
                        {p.code}: {p.name}
                      </button>
                    ))}
                    <button
                      onClick={() => onNavigate('hub', sem.id)}
                      className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 transition hover:bg-emerald-200"
                    >
                      Practicals &amp; Lab Hub
                    </button>
                    <button
                      onClick={() => onNavigate('hub', sem.id)}
                      className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-sky-700 transition hover:bg-sky-200"
                    >
                      DSE / Minor / SEC / VAC / AEC structure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other tabs */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Learning tools</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {tabs.map(({ tab, label, icon: Icon, desc }) => (
                <button
                  key={tab}
                  onClick={() => onNavigate(tab)}
                  className="group flex items-start gap-3 rounded-lg border border-navy-100 p-3 text-left transition hover:border-amber-400 hover:bg-amber-50/50"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>
                    <span className="block text-sm font-semibold text-navy-900 group-hover:text-amber-700">{label}</span>
                    <span className="block text-xs text-navy-500">{desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources inside hub */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">Resources</p>
            <div className="mt-2 space-y-2">
              {extras.map(({ label, desc, tab }) => (
                <button
                  key={label}
                  onClick={() => onNavigate(tab)}
                  className="group flex w-full items-start gap-3 rounded-lg border border-navy-100 p-3 text-left transition hover:border-amber-400 hover:bg-amber-50/50"
                >
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    <span className="block text-sm font-semibold text-navy-900 group-hover:text-amber-700">{label}</span>
                    <span className="block text-xs text-navy-500">{desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
