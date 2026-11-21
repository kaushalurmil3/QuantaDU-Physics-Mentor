import { useState } from 'react';
import { CheckCircle2, Copy, ExternalLink, MessageSquare, Star, X } from 'lucide-react';

const GITHUB_ISSUES_URL = 'https://github.com/kaushalurmil3/du-physics-mentor/issues/new';

const FEEDBACK_TYPES = [
  'Request a PYQ / Topic',
  'Report a Formula Typo',
  'General Suggestion / Rating',
] as const;

export default function FeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState(1);
  const [type, setType] = useState<(typeof FEEDBACK_TYPES)[number]>('General Suggestion / Rating');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const title = `[${type}] Sem ${semester} — ${message.slice(0, 60) || 'Student feedback'}${rating ? ` (${rating}★)` : ''}`;
  const body = [
    `**Student:** ${name.trim() || 'Anonymous'}`,
    `**Semester:** ${semester}`,
    `**Feedback type:** ${type}`,
    `**Rating:** ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`,
    '',
    '**Details:**',
    message.trim() || '(no details provided)',
  ].join('\n');

  const githubUrl = `${GITHUB_ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setCopied(false);
      setName('');
      setSemester(1);
      setType('General Suggestion / Rating');
      setRating(5);
      setMessage('');
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={close}
    >
      <div
        className="animate-rise max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Student feedback form"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-navy-100 bg-white px-6 py-4">
          <p className="flex items-center gap-2 text-base font-semibold text-navy-900">
            <MessageSquare className="h-5 w-5 text-amber-500" />
            Help Improve DU Physics Mentor
          </p>
          <button
            onClick={close}
            className="rounded-lg p-1.5 text-navy-400 transition hover:bg-navy-100 hover:text-navy-700"
            aria-label="Close feedback form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <p className="mt-3 text-base font-semibold text-navy-900">
              Thank you! Your feedback helps DU Physics students.
            </p>
            <p className="mt-1 text-sm text-navy-500">
              Want it logged publicly? Post it straight to the project's GitHub, or copy the text as a backup.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-navy-700"
              >
                <ExternalLink className="h-4 w-4" />
                Post Directly to GitHub Issues
              </a>
              <button
                onClick={copyText}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy-200 px-5 py-3 text-sm font-medium text-navy-700 transition hover:border-amber-400 hover:text-amber-700"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Feedback Text'}
              </button>
              <button
                onClick={close}
                className="text-xs font-medium text-navy-400 transition hover:text-navy-600"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form
            className="space-y-4 px-6 py-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-navy-500">
                Student name &amp; DU college <span className="text-navy-300">(optional, e.g. "Ananya, Hindu College")</span>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya, Hindu College"
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-navy-500">Semester</span>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={s}>Sem {s}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="mb-1 block text-xs font-medium text-navy-500">Feedback type</legend>
              <div className="space-y-2">
                {FEEDBACK_TYPES.map((t) => (
                  <label
                    key={t}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition ${
                      type === t
                        ? 'border-amber-400 bg-amber-50 font-medium text-navy-900'
                        : 'border-navy-200 bg-white text-navy-700 hover:border-navy-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedback-type"
                      checked={type === t}
                      onChange={() => setType(t)}
                      className="h-4 w-4 border-navy-300 text-amber-600 focus:ring-amber-300"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <span className="mb-1 block text-xs font-medium text-navy-500">Star rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
                    className="rounded p-0.5 transition hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 transition ${
                        s <= rating ? 'fill-amber-400 text-amber-400' : 'text-navy-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-medium text-navy-500">{rating}/5</span>
              </div>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-navy-500">Message / details</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                placeholder="e.g. Please add PYQs for DSC-11 Solid State Physics, or: In DSC-5 notes, the formula for … has a typo."
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm leading-relaxed text-navy-900 placeholder:text-navy-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-card transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
