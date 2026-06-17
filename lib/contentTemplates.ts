import type { ContentOutput, ProductInput, VideoStructure } from "@/lib/types";

type TemplateInput = Pick<
  ProductInput,
  | "productName"
  | "category"
  | "targetAudience"
  | "painPoint"
  | "benefit"
  | "price"
>;

export function generateContentTemplates(input: TemplateInput): ContentOutput {
  return {
    hooks: generateHooks(input),
    videoStructures: generateVideoStructures(),
    captions: generateCaptions(input),
    hashtags: generateHashtags(input),
  };
}

export function generateHooks(input: TemplateInput): string[] {
  const { productName, targetAudience, painPoint, benefit, price } =
    formatTemplateInput(input);

  return [
    `ใครที่${painPoint} ต้องดูตัวนี้`,
    `ของชิ้นนี้ราคาแค่ ${price} แต่ช่วยเรื่อง ${benefit}`,
    "ตอนแรกคิดว่าไม่จำเป็น พอใช้แล้วติดเลย",
    `สาย ${targetAudience} น่าจะชอบสิ่งนี้`,
    `ถ้าเจอปัญหา ${painPoint} ลองดูตัวนี้`,
    "ของถูกที่ใช้ได้จริง ไม่ได้อวย",
    "เห็นคนซื้อเยอะ เลยลองเอง",
    `ก่อนซื้อ ${productName} ต้องรู้เรื่องนี้`,
    "ของเล็กๆ ที่ช่วยให้ชีวิตง่ายขึ้น",
    "คุ้มไหม? เดี๋ยวเล่าให้ฟัง",
  ];
}

export function generateVideoStructures(): VideoStructure[] {
  return [
    {
      title: "จากปัญหาสู่การสาธิต",
      steps: ["Hook", "Problem", "Product reveal", "Demo", "CTA"],
    },
    {
      title: "ก่อนใช้และหลังใช้",
      steps: ["Before", "After", "Why it works", "Price", "CTA"],
    },
    {
      title: "จากข้อผิดพลาดสู่ทางออก",
      steps: [
        "Common mistake",
        "Product solution",
        "Benefit",
        "Who should buy",
        "CTA",
      ],
    },
  ];
}

export function generateCaptions(input: TemplateInput): string[] {
  const { productName, targetAudience, painPoint, benefit, price } =
    formatTemplateInput(input);

  return [
    `${productName} เหมาะกับคนที่${painPoint} ใช้ง่ายและช่วยเรื่อง ${benefit}`,
    `ถ้าคุณเป็นสาย ${targetAudience} ตัวนี้น่าลองมาก ราคา ${price}`,
    `ลองใช้แล้วรู้สึกว่า ${benefit} ใครมีปัญหา ${painPoint} ลองดูได้`,
    `ของที่ไม่ได้จำเป็นสำหรับทุกคน แต่ถ้าคุณ${painPoint} น่าจะชอบ`,
    `สรุปสั้นๆ: ${productName} เหมาะกับ ${targetAudience} ที่อยากได้ตัวช่วยเรื่อง ${benefit}`,
  ];
}

export function generateHashtags(input: TemplateInput): string[] {
  const categoryTag = toHashtag(input.category);
  const audienceTag = toHashtag(input.targetAudience);

  return [
    "#ของดีบอกต่อ",
    "#รีวิวของใช้",
    "#TikTokป้ายยา",
    "#ShopeeFinds",
    "#AffiliateTH",
    "#คุ้มค่าคุ้มราคา",
    "#ของมันต้องมี",
    "#รีวิวจริง",
    categoryTag,
    audienceTag,
  ];
}

function formatTemplateInput(input: TemplateInput) {
  return {
    ...input,
    productName: input.productName.trim() || "สินค้านี้",
    category: input.category.trim() || "สินค้า",
    targetAudience: input.targetAudience.trim() || "คนที่สนใจสินค้านี้",
    painPoint: input.painPoint.trim() || "เจอปัญหานี้",
    benefit: input.benefit.trim() || "ทำให้ชีวิตง่ายขึ้น",
    price: formatPrice(input.price),
  };
}

function formatPrice(price: number): string {
  if (!Number.isFinite(price) || price <= 0) {
    return "ราคาน่ารัก";
  }

  return `${price.toLocaleString("th-TH")} บาท`;
}

function toHashtag(value: string): string {
  const normalized = value
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, "");

  if (!normalized) {
    return "#สินค้าแนะนำ";
  }

  return `#${normalized}`;
}
