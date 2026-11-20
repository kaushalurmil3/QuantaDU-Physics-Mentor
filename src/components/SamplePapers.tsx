import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Lightbulb } from 'lucide-react';
import { SAMPLE_PAPERS, type Question } from '@/data/samplePapers';

function SchemeToggle({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
      >
        <Lightbulb className="h-4 w-4" />
        {open ? 'Hide Marking Scheme & Model Solution' : 'Show Marking Scheme & Model Solution'}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="mt-3 animate-rise rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Marking scheme &amp; model solution ({q.marks} marks)
          </p>
          <ol className="mt-2 space-y-1.5">
            {q.solution.map((line, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-navy-900">
                <span className="shrink-0 font-semibold text-emerald-600">{i + 1}.</span>
                <span className="formula">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function SamplePapers() {
  const [paperId, setPaperId] = useState(SAMPLE_PAPERS[0].id);
  const paper = SAMPLE_PAPERS.find((p) => p.id === paperId) ?? SAMPLE_PAPERS[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-900">DU Sample Papers</h2>
      <p className="mt-1 text-sm text-navy-500">
        Realistic UGCF end-semester theory papers with a marking scheme hidden under every question.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SAMPLE_PAPERS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPaperId(p.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              p.id === paper.id
                ? 'bg-navy-800 text-white shadow-card'
                : 'border border-navy-200 bg-white text-navy-600 hover:border-amber-400 hover:text-amber-700'
            }`}
          >
            {p.paperCode.split(' ')[0]}
          </button>
        ))}
      </div>

      <div key={paper.id} className="mt-6 overflow-hidden rounded-xl border border-navy-200 bg-white shadow-card">
        {/* Question-paper header */}
        <header className="border-b-2 border-navy-900 bg-navy-50/60 px-6 py-6 text-center">
          <div className="flex items-center justify-between text-xs font-medium text-navy-500">
            <span className="uppercase tracking-wide">Roll No. ______________</span>
            <span className="uppercase tracking-wide">Set: A</span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-500">
            University of Delhi
          </p>
          <h3 className="mt-2 text-xl font-semibold text-navy-900">{paper.title}</h3>
          <p className="mt-1 text-sm text-navy-700">{paper.course}</p>
          <p className="text-sm font-medium text-navy-500">{paper.paperCode}</p>
          <div className="mt-4 flex items-center justify-center gap-8 text-sm">
            <span className="font-medium text-navy-900">Time: {paper.duration}</span>
            <span className="font-medium text-navy-900">Maximum Marks: {paper.maxMarks}</span>
          </div>
        </header>

        <div className="px-6 py-5">
          <p className="rounded-lg bg-navy-50 px-4 py-3 text-sm leading-relaxed text-navy-700">
            <span className="font-semibold">General instructions: </span>
            {paper.note}
          </p>

          {paper.sections.map((section) => (
            <section key={section.title} className="mt-8">
              <div className="border-b border-navy-200 pb-2">
                <h4 className="text-base font-semibold text-navy-900">{section.title}</h4>
                <p className="mt-0.5 text-sm text-navy-500">{section.instruction}</p>
              </div>

              <ol className="mt-4 space-y-6">
                {section.questions.map((q) => (
                  <li key={q.number} className="rounded-lg border border-navy-100 bg-slate-50/50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm leading-relaxed text-navy-900">
                        <span className="font-semibold">{q.number}.</span>{' '}
                        <span className="formula">{q.text}</span>
                      </p>
                      <span className="shrink-0 rounded-full bg-navy-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                        [{q.marks}]
                      </span>
                    </div>
                    {q.subParts?.map((sp) => (
                      <p key={sp} className="formula mt-1.5 pl-6 text-sm text-navy-800">{sp}</p>
                    ))}
                    <SchemeToggle q={q} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <footer className="border-t border-navy-100 bg-navy-50/60 px-6 py-4 text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-navy-500">
            <FileText className="h-3.5 w-3.5" />
            — End of question paper — Compare your attempt with the model solutions, then try the AI Professor Grader.
          </p>
        </footer>
      </div>
    </div>
  );
}
