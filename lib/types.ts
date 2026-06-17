export type ContentPotential =
  | "very-high"
  | "high"
  | "medium"
  | "low"
  | "very-low";

export type Grade = "Excellent" | "Strong" | "Test" | "Risky" | "Avoid";

export type Recommendation =
  | "🔥 รีบทำ"
  | "✅ น่าสนใจมาก"
  | "👍 ทดลองได้"
  | "⚠️ ระวัง"
  | "❌ ผ่าน";

export type ProductInput = {
  productName: string;
  category: string;
  price: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  commissionRate?: number;
  estimatedCommission?: number;
  productUrl?: string;
  painPoint: string;
  benefit: string;
  targetAudience: string;
  contentPotential: ContentPotential;
  notes?: string;
};

export type ScoreBreakdown = {
  sales: number;
  review: number;
  rating: number;
  price: number;
  commission: number;
  contentPotential: number;
};

export type ScoreResult = {
  totalScore: number;
  grade: Grade;
  recommendation: Recommendation;
  mainReason: string;
  riskWarnings: string[];
  breakdown: ScoreBreakdown;
};

export type VideoStructure = {
  title: string;
  steps: string[];
};

export type ContentOutput = {
  hooks: string[];
  videoStructures: VideoStructure[];
  captions: string[];
  hashtags: string[];
};

export type AnalyzedProduct = {
  id: string;
  createdAt: string;
  input: ProductInput;
  score: ScoreResult;
  content: ContentOutput;
};
