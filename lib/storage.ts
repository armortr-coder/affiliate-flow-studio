import type {
  AnalyzedProduct,
  ContentOutput,
  ContentPotential,
  Grade,
  ProductInput,
  Recommendation,
  ScoreResult,
  VideoStructure,
} from "@/lib/types";

const STORAGE_KEY = "affiliate-flow-studio:history";
const CONTENT_POTENTIAL_VALUES: ContentPotential[] = [
  "very-high",
  "high",
  "medium",
  "low",
  "very-low",
];
const GRADE_VALUES: Grade[] = ["Excellent", "Strong", "Test", "Risky", "Avoid"];
const RECOMMENDATION_VALUES: Recommendation[] = [
  "🔥 รีบทำ",
  "✅ น่าสนใจมาก",
  "👍 ทดลองได้",
  "⚠️ ระวัง",
  "❌ ผ่าน",
];

export function loadProductHistory(): AnalyzedProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter(isAnalyzedProduct) : [];
  } catch {
    return [];
  }
}

export function saveProductHistory(products: AnalyzedProduct[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Storage can fail in private mode or when quota is full.
  }
}

export function clearProductHistory(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Clearing should never break the app flow.
  }
}

function isAnalyzedProduct(value: unknown): value is AnalyzedProduct {
  if (!isRecord(value)) return false;

  return (
    isString(value.id) &&
    isValidDate(value.createdAt) &&
    isProductInput(value.input) &&
    isScoreResult(value.score) &&
    isContentOutput(value.content)
  );
}

function isProductInput(value: unknown): value is ProductInput {
  if (!isRecord(value)) return false;

  return (
    isString(value.productName) &&
    isString(value.category) &&
    isNumber(value.price) &&
    isNumber(value.soldCount) &&
    Number.isInteger(value.soldCount) &&
    isNumber(value.rating) &&
    isNumber(value.reviewCount) &&
    Number.isInteger(value.reviewCount) &&
    isOptionalNumber(value.commissionRate) &&
    isOptionalNumber(value.estimatedCommission) &&
    isOptionalString(value.productUrl) &&
    isString(value.painPoint) &&
    isString(value.benefit) &&
    isString(value.targetAudience) &&
    isContentPotential(value.contentPotential) &&
    isOptionalString(value.notes)
  );
}

function isScoreResult(value: unknown): value is ScoreResult {
  if (!isRecord(value) || !isRecord(value.breakdown)) return false;

  return (
    isNumber(value.totalScore) &&
    isGrade(value.grade) &&
    isRecommendation(value.recommendation) &&
    isString(value.mainReason) &&
    isStringArray(value.riskWarnings) &&
    isNumber(value.breakdown.sales) &&
    isNumber(value.breakdown.review) &&
    isNumber(value.breakdown.rating) &&
    isNumber(value.breakdown.price) &&
    isNumber(value.breakdown.commission) &&
    isNumber(value.breakdown.contentPotential)
  );
}

function isContentOutput(value: unknown): value is ContentOutput {
  if (!isRecord(value)) return false;

  return (
    isStringArray(value.hooks) &&
    Array.isArray(value.videoStructures) &&
    value.videoStructures.every(isVideoStructure) &&
    isStringArray(value.captions) &&
    isStringArray(value.hashtags)
  );
}

function isVideoStructure(value: unknown): value is VideoStructure {
  return isRecord(value) && isString(value.title) && isStringArray(value.steps);
}

function isContentPotential(value: unknown): value is ContentPotential {
  return CONTENT_POTENTIAL_VALUES.includes(value as ContentPotential);
}

function isGrade(value: unknown): value is Grade {
  return GRADE_VALUES.includes(value as Grade);
}

function isRecommendation(value: unknown): value is Recommendation {
  return RECOMMENDATION_VALUES.includes(value as Recommendation);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || isNumber(value);
}

function isValidDate(value: unknown): value is string {
  return isString(value) && !Number.isNaN(new Date(value).getTime());
}
