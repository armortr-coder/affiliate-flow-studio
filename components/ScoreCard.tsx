import type { ScoreResult } from "@/lib/types";

type ScoreCardProps = {
  result: ScoreResult;
};

const GRADE_LABELS: Record<ScoreResult["grade"], string> = {
  Excellent: "ยอดเยี่ยม",
  Strong: "แข็งแรง",
  Test: "ทดลองได้",
  Risky: "มีความเสี่ยง",
  Avoid: "ควรผ่าน",
};

export function ScoreCard({ result }: ScoreCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">คะแนนสินค้า</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-bold tracking-normal text-slate-950">
              {result.totalScore}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500">/ 100</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800">
            {GRADE_LABELS[result.grade]}
          </span>
          <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            {result.recommendation}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-sm font-medium text-slate-500">เหตุผลหลัก</p>
        <p className="mt-1 text-base text-slate-800">{result.mainReason}</p>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">ความเสี่ยง</p>
        {result.riskWarnings.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {result.riskWarnings.map((warning) => (
              <li
                className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
                key={warning}
              >
                {warning}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-slate-600">ยังไม่พบสัญญาณเสี่ยงเด่น</p>
        )}
      </div>
    </section>
  );
}
