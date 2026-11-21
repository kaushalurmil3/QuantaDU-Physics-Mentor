import { useMemo, useState } from 'react';
import {
  BookOpen,
  BookMarked,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Library,
  MonitorPlay,
  PlayCircle,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { BOOKS, DU_SYLLABUS_LINKS, ONLINE_RESOURCES, type Tag } from '@/data/resources';

const TAG_STYLES: Record<Tag, string> = {
  BUY: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  'BORROW / LIBRARY': 'bg-sky-100 text-sky-800 ring-sky-200',
  'REFERENCE ONLY': 'bg-amber-100 text-amber-800 ring-amber-200',
};

const TAG_ICON: Record<Tag, typeof BookOpen> = {
  BUY: ShoppingBag,
  'BORROW / LIBRARY': Library,
  'REFERENCE ONLY': BookMarked,
};

function OnlineResources() {
  return (
    <section>
      <h3 className="text-lg font-semibold tracking-tight text-navy-900">Best Online Resources</h3>
      <p className="mt-1 text-sm text-navy-500">
        Hand-picked free resources used by DU toppers — video courses, problem sets and Python labs.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ONLINE_RESOURCES.map((card) => (
          <div key={card.title} className="flex flex-col rounded-xl border border-navy-100 bg-white p-4 shadow-card transition hover:shadow-card-hover">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              {card.title === 'Python & Computational Physics' ? (
                <FlaskConical className="h-4 w-4 shrink-0 text-amber-500" />
              ) : (
                <MonitorPlay className="h-4 w-4 shrink-0 text-amber-500" />
              )}
              {card.title}
            </p>
            <ul className="mt-3 flex-1 space-y-3">
              {card.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-navy-100 bg-navy-50/60 p-3 transition hover:border-amber-400 hover:bg-amber-50"
                  >
                    <span className="flex items-start justify-between gap-2 text-xs font-semibold leading-snug text-navy-800 group-hover:text-amber-700">
                      {link.label}
                      <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-navy-300 group-hover:text-amber-500" />
                    </span>
                    {link.desc && <span className="mt-1 block text-[11px] leading-snug text-navy-500">{link.desc}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookRow({ book }: { book: (typeof BOOKS)[number] }) {
  const Icon = TAG_ICON[book.tag];
  return (
    <tr className="border-b border-navy-50 align-top last:border-0">
      <td className="px-4 py-4">
        <p className="text-sm font-semibold text-navy-900">{book.title}</p>
        <p className="mt-0.5 text-xs text-navy-500">{book.author}</p>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${TAG_STYLES[book.tag]}`}>
          <Icon className="h-3 w-3" />
          {book.tag}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            {book.rating.toFixed(1)}
          </span>
          <span className="text-[11px] font-medium text-navy-400">/ 5</span>
        </div>
        <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-navy-600">{book.reason}</p>
      </td>
    </tr>
  );
}

function Roadmap() {
  const [semester, setSemester] = useState<number | 'all'>('all');
  const books = useMemo(
    () => (semester === 'all' ? BOOKS : BOOKS.filter((b) => b.semester === semester)),
    [semester]
  );

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold tracking-tight text-navy-900">Semester-wise Study Road Map &amp; Textbook Guide</h3>
      <p className="mt-1 text-sm text-navy-500">
        Which book to buy, which to borrow, and why — rated the way a DU professor would rate them.
      </p>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-navy-800">
          <GraduationCap className="h-4 w-4 shrink-0 text-amber-600" />
          Always study from the official syllabus — download it directly from Delhi University:
        </p>
        <div className="flex flex-wrap gap-2">
          {DU_SYLLABUS_LINKS.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-navy-700"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {l.label}
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSemester('all')}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            semester === 'all' ? 'bg-navy-800 text-white shadow-card' : 'border border-navy-200 bg-white text-navy-600 hover:border-amber-400'
          }`}
        >
          All Semesters
        </button>
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <button
            key={s}
            onClick={() => setSemester(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              semester === s ? 'bg-navy-800 text-white shadow-card' : 'border border-navy-200 bg-white text-navy-600 hover:border-amber-400'
            }`}
          >
            Sem {s}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-navy-900 bg-navy-50/70">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500">Book</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500">Verdict</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500">AI Professor Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <BookRow key={`${b.semester}-${b.title}`} book={b} />
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-navy-400">No books listed for this filter yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-navy-400">
        <PlayCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Tip: pair each book with the verified NPTEL playlist inside the paper page in the Semester Hub — reading plus watching covers both derivation and intuition.
      </p>
    </section>
  );
}

export default function ResourceRoadmap() {
  return (
    <div className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <OnlineResources />
        <Roadmap />
      </div>
    </div>
  );
}
