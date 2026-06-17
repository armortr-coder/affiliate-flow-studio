import type { ProductInput, ScoreBreakdown as ScoreBreakdownType } from "@/lib/types";

type ScoreBreakdownProps = {
  input: ProductInput;
  breakdown: ScoreBreakdownType;
};

type BreakdownItem = {
  key: keyof ScoreBreakdownType;
  label: string;
  max: number;
  explanation: string;
};

export function ScoreBreakdown({ input, breakdown }: ScoreBreakdownProps) {
  const items = getBreakdownItems(input, breakdown);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">รายละเอียดคะแนน</h2>

      <div className="mt-4 space-y-4">
        {items.map((item) => {
          const score = breakdown[item.key];
          const percentage = Math.round((score / item.max) * 100);

          return (
            <div key={item.key}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.explanation}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-slate-900">
                  {score}/{item.max}
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getBreakdownItems(
  input: ProductInput,
  breakdown: ScoreBreakdownType,
): BreakdownItem[] {
  return [
    {
      key: "sales",
      label: "ยอดขาย",
      max: 20,
      explanation: explainSales(input.soldCount, breakdown.sales),
    },
    {
      key: "review",
      label: "จำนวนรีวิว",
      max: 15,
      explanation: explainReviews(input.reviewCount, breakdown.review),
    },
    {
      key: "rating",
      label: "คะแนนรีวิว",
      max: 15,
      explanation: explainRating(input.rating, breakdown.rating),
    },
    {
      key: "price",
      label: "ราคา",
      max: 15,
      explanation: explainPrice(input.price, breakdown.price),
    },
    {
      key: "commission",
      label: "ค่าคอมมิชชัน",
      max: 20,
      explanation: explainCommission(input, breakdown.commission),
    },
    {
      key: "contentPotential",
      label: "ศักยภาพคอนเทนต์",
      max: 15,
      explanation: explainContentPotential(input.contentPotential, breakdown.contentPotential),
    },
  ];
}

function explainSales(soldCount: number, score: number): string {
  return `ยอดขาย ${formatNumber(soldCount)} ชิ้น ได้ ${score} คะแนนตามระดับ demand`;
}

function explainReviews(reviewCount: number, score: number): string {
  return `มีรีวิว ${formatNumber(reviewCount)} รายการ ได้ ${score} คะแนนด้าน social proof`;
}

function explainRating(rating: number, score: number): string {
  return `คะแนนเฉลี่ย ${rating.toFixed(1)} จาก 5 ได้ ${score} คะแนนด้านความพึงพอใจ`;
}

function explainPrice(price: number, score: number): string {
  return `ราคา ${formatCurrency(price)} ได้ ${score} คะแนนตามช่วง impulse-buy`;
}

function explainCommission(input: ProductInput, score: number): string {
  const parts: string[] = [];

  if (input.commissionRate !== undefined) {
    parts.push(`${input.commissionRate}%`);
  }

  if (input.estimatedCommission !== undefined) {
    parts.push(formatCurrency(input.estimatedCommission));
  }

  return `ค่าคอม ${parts.join(" หรือ ")} ได้ ${score} คะแนนด้านความคุ้มค่า`;
}

function explainContentPotential(
  potential: ProductInput["contentPotential"],
  score: number,
): string {
  const labels: Record<ProductInput["contentPotential"], string> = {
    "very-high": "สูงมาก",
    high: "สูง",
    medium: "กลาง",
    low: "ต่ำ",
    "very-low": "ต่ำมาก",
  };

  return `ประเมินมุมคอนเทนต์เป็น ${labels[potential]} ได้ ${score} คะแนน`;
}

function formatNumber(value: number): string {
  return value.toLocaleString("th-TH");
}

function formatCurrency(value: number): string {
  return `${value.toLocaleString("th-TH")} บาท`;
}
