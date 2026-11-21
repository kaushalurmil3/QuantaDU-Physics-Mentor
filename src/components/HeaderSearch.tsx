import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, FileText, FlaskConical, GraduationCap, Layers, Search, Trophy, X } from 'lucide-react';
import { buildIndex, type SearchTab } from '@/data/searchIndex';

const TAB_ICON: Record<string, typeof BookOpen> = {
  hub: BookOpen,
  flashcards: Layers,
  papers: FileText,
  pyq: GraduationCap,
  grader: Trophy,
  lab: FlaskConical,
};

type Props = {
  onNavigate: (tab: SearchTab, semester?: number, paperId?: string) => void;
};

export default function HeaderSearch({ onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => buildIndex(query), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const pick = (tab: SearchTab, semester?: number, paperId?: string) => {
    setOpen(false);
    setQuery('');
    onNavigate(tab, semester, paperId);
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          placeholder="Search topics — Coriolis, Pendulum, Fourier, Hall effect…"
          className="w-full rounded-lg border border-navy-600 bg-navy-800/70 py-2 pl-9 pr-8 text-sm text-white placeholder:text-navy-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          aria-label="Search site content"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-navy-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[420px] overflow-y-auto rounded-xl border border-navy-100 bg-white shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-navy-400">
              No matches in the site for “{query.trim()}”.
            </p>
          ) : (
            <ul className="divide-y divide-navy-50">
              {results.map((r) => {
                const Icon = TAB_ICON[r.tab] ?? BookOpen;
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => pick(r.tab, r.semester, r.paperId)}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-amber-50"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span className="min-w-0">
                        <span className="block rounded-full bg-navy-100 px-2 py-0.5 text-[10px] font-semibold text-navy-600 w-fit">
                          {r.location}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-navy-700">{r.snippet}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
