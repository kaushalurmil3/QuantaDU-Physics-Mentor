import { useEffect, useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { FLASHCARDS, type Flashcard } from '@/data/flashcards';

type Status = 'mastered' | 'review' | null;
type Progress = Record<string, Status>;

const PAPER_STYLES: Record<Flashcard['paperCode'], string> = {
  'DSC-1': 'bg-navy-100 text-navy-700',
  'DSC-2': 'bg-emerald-100 text-emerald-700',
  'DSC-3': 'bg-amber-100 text-amber-700',
};

function Card({
  card,
  index,
  status,
  onStatus,
}: {
  card: Flashcard;
  index: number;
  status: Status;
  onStatus: (s: Status) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-scene h-80 w-full sm:h-72">
      <div
        className={`flip-card relative h-full w-full cursor-pointer ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        aria-label={`Flashcard ${index + 1}: click to flip`}
      >
        {/* Front: question */}
        <div className="flip-face absolute inset-0 flex flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition hover:shadow-card-hover">
          <div className="flex items-center justify-between">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PAPER_STYLES[card.paperCode]}`}>
              {card.paperCode}
            </span>
            <span className="text-xs text-navy-300">Card {index + 1}</span>
          </div>
          <p className="mt-4 flex-1 text-base font-medium leading-relaxed text-navy-900">{card.question}</p>
          <p className="text-center text-xs font-medium text-navy-400">Click to reveal the answer</p>
        </div>

        {/* Back: answer */}
        <div className="flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-navy-900 p-5 text-white shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Step-by-step answer</p>
          <div className="mt-2 flex-1 space-y-1.5 overflow-y-auto pr-1 text-sm leading-relaxed text-navy-100">
            {card.answer.map((line, i) => (
              <p key={i} className="formula">{line}</p>
            ))}
          </div>
          <p className="text-center text-xs text-navy-400">Click to see the question again</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatus(status === 'mastered' ? null : 'mastered');
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
            status === 'mastered'
              ? 'bg-emerald-600 text-white shadow-card'
              : 'border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {status === 'mastered' ? 'Mastered' : 'Mark as Mastered'}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatus(status === 'review' ? null : 'review');
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
            status === 'review'
              ? 'bg-amber-500 text-white shadow-card'
              : 'border border-amber-300 bg-white text-amber-700 hover:bg-amber-50'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
          {status === 'review' ? 'Needs Review' : 'Needs Review'}
        </button>
      </div>
    </div>
  );
}

export default function Flashcards() {
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    supabase
      .from('flashcard_progress')
      .select('card_id, status')
      .then(({ data, error }) => {
        if (error || !data) {
          setDbError(true);
        } else {
          const next: Progress = {};
          for (const row of data) next[row.card_id] = row.status as Status;
          setProgress(next);
        }
        setLoaded(true);
      });
  }, []);

  const setStatus = (cardId: string, status: Status) => {
    setProgress((p) => ({ ...p, [cardId]: status }));
    if (status === null) {
      supabase.from('flashcard_progress').delete().eq('card_id', cardId)
        .then(({ error }) => setDbError(!!error));
    } else {
      supabase
        .from('flashcard_progress')
        .upsert({ card_id: cardId, status, updated_at: new Date().toISOString() })
        .then(({ error }) => setDbError(!!error));
    }
  };

  const total = FLASHCARDS.length;
  const mastered = FLASHCARDS.filter((c) => progress[c.id] === 'mastered').length;
  const review = FLASHCARDS.filter((c) => progress[c.id] === 'review').length;
  const pct = total ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-900">Interactive Flashcards</h2>
      <p className="mt-1 text-sm text-navy-500">
        10 Semester 1 cards across all three core papers. Click a card to flip between the question and the step-by-step answer.
      </p>

      <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-navy-800">
            Progress: <span className="text-emerald-600">{mastered} mastered</span>
            <span className="text-navy-400"> · </span>
            <span className="text-amber-600">{review} need review</span>
            <span className="text-navy-400"> · {total} total</span>
          </p>
          <span className="font-semibold text-navy-900">{pct}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {dbError && (
          <p className="mt-2 text-xs text-amber-600">
            Progress is not saving right now — your marks for this session are still shown.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {FLASHCARDS.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            index={i}
            status={progress[card.id] ?? null}
            onStatus={(s) => setStatus(card.id, s)}
          />
        ))}
      </div>

      {loaded && !dbError && mastered === total && total > 0 && (
        <div className="mt-8 flex items-center gap-3 rounded-xl bg-emerald-600 px-5 py-4 text-white shadow-card">
          <Sparkles className="h-5 w-5 shrink-0 text-amber-300" />
          <p className="text-sm font-medium">Brilliant — all {total} cards mastered. You are exam-ready for this deck!</p>
        </div>
      )}
    </div>
  );
}
