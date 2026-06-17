import type { ContentOutput as ContentOutputType } from "@/lib/types";

type ContentOutputProps = {
  content: ContentOutputType;
};

export function ContentOutput({ content }: ContentOutputProps) {
  return (
    <section className="space-y-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">ไอเดียคอนเทนต์</h2>

      <ContentList title="ฮุกเปิดคลิป" items={content.hooks} />

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
          โครงวิดีโอ
        </h3>
        <div className="mt-3 grid gap-3">
          {content.videoStructures.map((structure) => (
            <div className="rounded-lg border border-slate-200 p-3" key={structure.title}>
              <p className="font-medium text-slate-900">{structure.title}</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                {structure.steps.map((step) => (
                  <li key={step}>{translateStep(step)}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <ContentList title="แคปชัน" items={content.captions} />

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
          แฮชแท็ก
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {content.hashtags.map((hashtag) => (
            <span
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
              key={hashtag}
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

type ContentListProps = {
  title: string;
  items: string[];
};

function ContentList({ title, items }: ContentListProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function translateStep(step: string): string {
  const labels: Record<string, string> = {
    Hook: "เปิดด้วย hook",
    Problem: "เล่าปัญหา",
    "Product reveal": "เปิดตัวสินค้า",
    Demo: "สาธิตการใช้",
    CTA: "ชวนกดซื้อหรือดูสินค้า",
    Before: "ก่อนใช้",
    After: "หลังใช้",
    "Why it works": "อธิบายว่าทำไมถึงช่วยได้",
    Price: "บอกราคา",
    "Common mistake": "เล่าข้อผิดพลาดที่พบบ่อย",
    "Product solution": "เสนอสินค้าเป็นทางออก",
    Benefit: "สรุปประโยชน์",
    "Who should buy": "บอกว่าเหมาะกับใคร",
  };

  return labels[step] ?? step;
}
