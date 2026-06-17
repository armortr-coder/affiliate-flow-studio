"use client";

import { useEffect, useState } from "react";
import { ContentOutput } from "@/components/ContentOutput";
import { ProductForm } from "@/components/ProductForm";
import { ProductHistory } from "@/components/ProductHistory";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { ScoreCard } from "@/components/ScoreCard";
import { generateContentTemplates } from "@/lib/contentTemplates";
import { calculateScore } from "@/lib/scoring";
import { clearProductHistory, loadProductHistory, saveProductHistory } from "@/lib/storage";
import type { AnalyzedProduct, ProductInput } from "@/lib/types";

export default function HomePage() {
  const [currentProduct, setCurrentProduct] = useState<AnalyzedProduct | null>(null);
  const [history, setHistory] = useState<AnalyzedProduct[]>([]);

  useEffect(() => {
    const savedProducts = loadProductHistory();
    setHistory(savedProducts);
    setCurrentProduct(savedProducts[0] ?? null);
  }, []);

  function handleAnalyze(input: ProductInput) {
    const analyzedProduct: AnalyzedProduct = {
      id: createId(),
      createdAt: new Date().toISOString(),
      input,
      score: calculateScore(input),
      content: generateContentTemplates(input),
    };

    setCurrentProduct(analyzedProduct);
    setHistory((currentHistory) => {
      const nextHistory = [analyzedProduct, ...currentHistory].slice(0, 50);
      saveProductHistory(nextHistory);
      return nextHistory;
    });
  }

  function handleSelect(product: AnalyzedProduct) {
    setCurrentProduct(product);
  }

  function handleDelete(id: string) {
    setHistory((currentHistory) => {
      const nextHistory = currentHistory.filter((product) => product.id !== id);
      saveProductHistory(nextHistory);

      if (currentProduct?.id === id) {
        setCurrentProduct(nextHistory[0] ?? null);
      }

      return nextHistory;
    });
  }

  function handleClear() {
    setHistory([]);
    setCurrentProduct(null);
    clearProductHistory();
  }

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-emerald-700">Affiliate Flow Studio</p>
        <h1 className="text-3xl font-bold tracking-normal text-slate-950">
          วิเคราะห์สินค้าก่อนทำคอนเทนต์
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          กรอกข้อมูลสินค้า คำนวณคะแนน และสร้าง hook/caption สำหรับเริ่มทดสอบคอนเทนต์
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="space-y-6">
          <ProductForm onAnalyze={handleAnalyze} />

          {currentProduct ? (
            <div className="space-y-6">
              <ScoreCard result={currentProduct.score} />
              <ScoreBreakdown
                breakdown={currentProduct.score.breakdown}
                input={currentProduct.input}
              />
              <ContentOutput content={currentProduct.content} />
            </div>
          ) : (
            <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
              ผลวิเคราะห์จะแสดงหลังกรอกข้อมูลสินค้า
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-6">
          <ProductHistory
            products={history}
            selectedId={currentProduct?.id}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        </aside>
      </div>
    </main>
  );
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
