import { useState } from 'react';
import { Atom, BookOpen, FileText, Github, Layers, Sparkles, Trophy } from 'lucide-react';
import SemesterHub from '@/components/SemesterHub';
import Flashcards from '@/components/Flashcards';
import SamplePapers from '@/components/SamplePapers';
import ProfessorGrader from '@/components/ProfessorGrader';

type TabId = 'hub' | 'flashcards' | 'papers' | 'grader';

const TABS: { id: TabId; label: string; icon: typeof BookOpen }[] = [
  { id: 'hub', label: 'Semester Hub & Notes', icon: BookOpen },
  { id: 'flashcards', label: 'Interactive Flashcards', icon: Layers },
  { id: 'papers', label: 'DU Sample Papers', icon: FileText },
  { id: 'grader', label: 'AI Professor Grader', icon: Trophy },
];

export default function App() {
  const [tab, setTab] = useState<TabId>('hub');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-navy-900/40 bg-navy-900 shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-400/40">
              <Atom className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">DU Physics Mentor</h1>
              <p className="text-xs text-navy-300">B.Sc. (Hons.) Physics · NEP UGCF-2022 · University of Delhi</p>
            </div>
          </div>

          {/* Desktop tabs */}
          <nav className="mt-4 hidden gap-1 md:flex">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  tab === id
                    ? 'bg-amber-500 text-navy-950 shadow-card'
                    : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile tabs: scrollable pills */}
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition ${
                  tab === id
                    ? 'bg-amber-500 text-navy-950'
                    : 'border border-navy-700 text-navy-200 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1" key={tab}>
        <div className="animate-rise">
          {tab === 'hub' && <SemesterHub />}
          {tab === 'flashcards' && <Flashcards />}
          {tab === 'papers' && <SamplePapers />}
          {tab === 'grader' && <ProfessorGrader />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
          <p className="flex items-center gap-2 text-sm font-medium text-navy-800">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Open-Source Initiative for DU Physics Students
          </p>
          <a
            href="https://github.com/your-username/du-physics-mentor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-1.5 text-xs font-medium text-navy-600 transition hover:border-amber-400 hover:text-amber-700"
          >
            <Github className="h-3.5 w-3.5" />
            github.com/your-username/du-physics-mentor
          </a>
          <p className="text-xs text-navy-400">
            Built by students, for students. Syllabus content aligned to the NEP UGCF-2022 curriculum.
          </p>
        </div>
      </footer>
    </div>
  );
}
