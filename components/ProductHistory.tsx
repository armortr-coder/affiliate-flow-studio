"use client";

import type { AnalyzedProduct } from "@/lib/types";

type ProductHistoryProps = {
  products: AnalyzedProduct[];
  selectedId?: string;
  onSelect: (product: AnalyzedProduct) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
};

export function ProductHistory({
  products,
  selectedId,
  onSelect,
  onDelete,
  onClear,
}: ProductHistoryProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">ประวัติสินค้า</h2>
          <p className="mt-1 text-sm text-slate-600">{products.length} รายการ</p>
        </div>

        <button
          className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={products.length === 0}
          onClick={onClear}
          type="button"
        >
          ล้างทั้งหมด
        </button>
      </div>

      {products.length === 0 ? (
        <p className="mt-4 rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-600">
          ยังไม่มีประวัติ
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {products.map((product) => (
            <li
              className={`rounded-lg border p-3 ${
                selectedId === product.id
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-200 bg-white"
              }`}
              key={product.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-950">
                    {product.input.productName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatDate(product.createdAt)} · {product.score.totalScore}/100 ·{" "}
                    {product.score.recommendation}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  onClick={() => onSelect(product)}
                  type="button"
                >
                  ดูผล
                </button>
                <button
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  onClick={() => onDelete(product.id)}
                  type="button"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
