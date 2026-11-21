import { FlaskConical, Lightbulb, Microscope } from 'lucide-react';
import { LAB_MARKS, LAB_SEMESTERS } from '@/data/labHub';

export default function LabHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-300">
          <FlaskConical className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900">Practicals &amp; Lab Hub</h2>
          <p className="text-sm text-navy-500">
            How DU practicals are scored, the semester-wise experiment list, and how to prepare for the viva.
          </p>
        </div>
      </div>

      {/* Marks breakdown */}
      <div className="mt-8 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Microscope className="h-4 w-4 text-amber-500" />
          Practical marks breakdown (per semester, out of 50)
        </p>
        <p className="mt-1 text-xs leading-relaxed text-navy-500">
          Continuous Evaluation + Viva-Voce + Lab Record + End-Sem Lab Exam — the exact split follows your college\u2019s
          UGCF scheme; the weights below are the standard pattern.
        </p>
        <div className="mt-4 space-y-3">
          {LAB_MARKS.map((m) => (
            <div key={m.component} className="rounded-lg border border-navy-100 bg-navy-50/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-navy-900">{m.component}</p>
                <span className="shrink-0 rounded-full bg-navy-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {m.marks} marks
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-navy-600">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semester-wise lab topics */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-navy-900 bg-navy-50/70">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500">Semester</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500">Laboratory topics &amp; experiments</th>
            </tr>
          </thead>
          <tbody>
            {LAB_SEMESTERS.map((s) => (
              <tr key={s.semester} className="border-b border-navy-50 align-top">
                <td className="px-4 py-4">
                  <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-white">
                    Semester {s.semester}
                  </span>
                  <p className="mt-2 max-w-[180px] text-[11px] leading-snug text-navy-400">{s.experiments}</p>
                </td>
                <td className="px-4 py-4">
                  <ul className="space-y-1.5">
                    {s.topics.map((t) => (
                      <li key={t} className="flex gap-2 text-sm leading-relaxed text-navy-800">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Viva & lab record prep tips per semester */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {LAB_SEMESTERS.map((s) => (
          <div key={s.semester} className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <Lightbulb className="h-4 w-4" />
              Viva-Voce &amp; Lab Record Prep — Semester {s.semester}
            </p>
            <ul className="mt-3 space-y-2">
              {s.vivaTips.map((tip, i) => (
                <li key={i} className="text-sm leading-relaxed text-navy-800">
                  <span className="font-semibold text-emerald-600">{i + 1}. </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
