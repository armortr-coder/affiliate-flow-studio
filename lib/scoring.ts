import type {
  ContentPotential,
  Grade,
  ProductInput,
  Recommendation,
  ScoreBreakdown,
  ScoreResult,
} from "@/lib/types";

const CONTENT_POTENTIAL_SCORE: Record<ContentPotential, number> = {
  "very-high": 15,
  high: 12,
  medium: 8,
  low: 4,
  "very-low": 1,
};

export function calculateScore(input: ProductInput): ScoreResult {
  const breakdown: ScoreBreakdown = {
    sales: calculateSalesScore(input.soldCount),
    review: calculateReviewScore(input.reviewCount),
    rating: calculateRatingScore(input.rating),
    price: calculatePriceScore(input.price),
    commission: calculateCommissionScore(
      input.estimatedCommission,
      input.commissionRate,
    ),
    contentPotential: calculateContentPotentialScore(input.contentPotential),
  };

  const totalScore = Object.values(breakdown).reduce(
    (sum, score) => sum + score,
    0,
  );
  const grade = getGrade(totalScore);

  return {
    totalScore,
    grade,
    recommendation: getRecommendation(totalScore),
    mainReason: getMainReason(breakdown),
    riskWarnings: getRiskWarnings(breakdown),
    breakdown,
  };
}

export function calculateSalesScore(soldCount: number): number {
  if (soldCount >= 10000) return 20;
  if (soldCount >= 5000) return 16;
  if (soldCount >= 1000) return 12;
  if (soldCount >= 300) return 8;
  if (soldCount >= 100) return 5;
  return 2;
}

export function calculateReviewScore(reviewCount: number): number {
  if (reviewCount >= 3000) return 15;
  if (reviewCount >= 1000) return 12;
  if (reviewCount >= 300) return 9;
  if (reviewCount >= 100) return 6;
  if (reviewCount >= 30) return 3;
  return 1;
}

export function calculateRatingScore(rating: number): number {
  if (rating >= 4.8) return 15;
  if (rating >= 4.6) return 12;
  if (rating >= 4.4) return 9;
  if (rating >= 4.2) return 6;
  if (rating >= 4.0) return 3;
  return 0;
}

export function calculatePriceScore(price: number): number {
  if (price >= 99 && price <= 499) return 15;
  if (price >= 500 && price <= 999) return 12;
  if (price >= 1000 && price <= 1999) return 8;
  if (price >= 2000 && price <= 4999) return 5;
  return 3;
}

export function calculateCommissionScore(
  estimatedCommission?: number,
  commissionRate?: number,
): number {
  const commission = estimatedCommission ?? 0;
  const rate = commissionRate ?? 0;

  if (commission >= 200 || rate >= 10) return 20;
  if (commission >= 100 || rate >= 7) return 16;
  if (commission >= 50 || rate >= 5) return 12;
  if (commission >= 20 || rate >= 3) return 8;
  return 3;
}

export function calculateContentPotentialScore(
  contentPotential: ContentPotential,
): number {
  return CONTENT_POTENTIAL_SCORE[contentPotential];
}

export function getGrade(totalScore: number): Grade {
  if (totalScore >= 90) return "Excellent";
  if (totalScore >= 80) return "Strong";
  if (totalScore >= 70) return "Test";
  if (totalScore >= 60) return "Risky";
  return "Avoid";
}

export function getRecommendation(totalScore: number): Recommendation {
  if (totalScore >= 90) return "🔥 รีบทำ";
  if (totalScore >= 80) return "✅ น่าสนใจมาก";
  if (totalScore >= 70) return "👍 ทดลองได้";
  if (totalScore >= 60) return "⚠️ ระวัง";
  return "❌ ผ่าน";
}

export function getMainReason(breakdown: ScoreBreakdown): string {
  const strongestSignal = Object.entries(breakdown).sort(
    ([, firstScore], [, secondScore]) => secondScore - firstScore,
  )[0]?.[0];

  switch (strongestSignal) {
    case "sales":
      return "ยอดขายเป็นสัญญาณหลักว่าสินค้ามี demand อยู่แล้ว";
    case "review":
      return "จำนวนรีวิวช่วยเพิ่มความน่าเชื่อถือก่อนโปรโมต";
    case "rating":
      return "คะแนน rating ดี ช่วยลดความเสี่ยงเรื่องคุณภาพสินค้า";
    case "price":
      return "ราคาอยู่ในช่วงที่เหมาะกับการตัดสินใจซื้อเร็ว";
    case "commission":
      return "ค่าคอมมิชชันมีโอกาสคุ้มกับแรงทำคอนเทนต์";
    case "contentPotential":
      return "สินค้ามีมุมทำคอนเทนต์ที่เล่าได้ง่าย";
    default:
      return "คะแนนรวมมาจากหลายปัจจัยที่ควรพิจารณาร่วมกัน";
  }
}

export function getRiskWarnings(breakdown: ScoreBreakdown): string[] {
  const warnings: string[] = [];

  if (breakdown.sales >= 16 && breakdown.commission <= 8) {
    warnings.push("ยอดขายดี แต่ค่าคอมต่ำ อาจไม่คุ้มกับแรงโปรโมต");
  }

  if (breakdown.commission >= 16 && breakdown.sales <= 8) {
    warnings.push("ค่าคอมดี แต่ยอดขายยังไม่ชัด ต้องทดสอบ demand ก่อน");
  }

  if (breakdown.rating >= 12 && breakdown.review <= 6) {
    warnings.push("rating ดี แต่จำนวนรีวิวยังน้อย หลักฐานความน่าเชื่อถือยังจำกัด");
  }

  if (breakdown.rating <= 3) {
    warnings.push("rating ต่ำ อาจกระทบความเชื่อมั่นและ conversion");
  }

  if (breakdown.price <= 5) {
    warnings.push("ราคาอาจสูงเกินไปสำหรับสินค้า impulse-buy");
  }

  return warnings;
}
