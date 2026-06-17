"use client";

import { FormEvent, useState } from "react";
import type { ContentPotential, ProductInput } from "@/lib/types";

type ProductFormProps = {
  onAnalyze: (input: ProductInput) => void;
};

type FormState = {
  productName: string;
  category: string;
  price: string;
  soldCount: string;
  rating: string;
  reviewCount: string;
  commissionRate: string;
  estimatedCommission: string;
  contentPotential: ContentPotential;
  targetAudience: string;
  painPoint: string;
  benefit: string;
  productUrl: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState | "commission", string>>;

const INITIAL_FORM_STATE: FormState = {
  productName: "",
  category: "",
  price: "",
  soldCount: "",
  rating: "",
  reviewCount: "",
  commissionRate: "",
  estimatedCommission: "",
  contentPotential: "medium",
  targetAudience: "",
  painPoint: "",
  benefit: "",
  productUrl: "",
  notes: "",
};

const CONTENT_OPTIONS: Array<{ value: ContentPotential; label: string }> = [
  { value: "very-high", label: "สูงมาก" },
  { value: "high", label: "สูง" },
  { value: "medium", label: "กลาง" },
  { value: "low", label: "ต่ำ" },
  { value: "very-low", label: "ต่ำมาก" },
];

export function ProductForm({ onAnalyze }: ProductFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      commission:
        field === "commissionRate" || field === "estimatedCommission"
          ? undefined
          : current.commission,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onAnalyze(toProductInput(form));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">ข้อมูลสินค้า</h2>
          <p className="mt-1 text-sm text-slate-600">ใส่ข้อมูลจาก Shopee หรือ TikTok Shop</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="ชื่อสินค้า"
            value={form.productName}
            error={errors.productName}
            onChange={(value) => updateField("productName", value)}
            required
          />
          <TextField
            label="หมวดหมู่"
            value={form.category}
            error={errors.category}
            onChange={(value) => updateField("category", value)}
            required
          />
          <NumberField
            label="ราคา"
            value={form.price}
            error={errors.price}
            min="0"
            suffix="บาท"
            onChange={(value) => updateField("price", value)}
            required
          />
          <NumberField
            label="ยอดขาย"
            value={form.soldCount}
            error={errors.soldCount}
            min="0"
            step="1"
            suffix="ชิ้น"
            onChange={(value) => updateField("soldCount", value)}
            required
          />
          <NumberField
            label="คะแนนรีวิว"
            value={form.rating}
            error={errors.rating}
            min="0"
            max="5"
            step="0.1"
            suffix="/ 5"
            onChange={(value) => updateField("rating", value)}
            required
          />
          <NumberField
            label="จำนวนรีวิว"
            value={form.reviewCount}
            error={errors.reviewCount}
            min="0"
            step="1"
            suffix="รีวิว"
            onChange={(value) => updateField("reviewCount", value)}
            required
          />
          <NumberField
            label="เปอร์เซ็นต์คอมมิชชัน"
            value={form.commissionRate}
            error={errors.commissionRate ?? errors.commission}
            min="0"
            max="100"
            step="0.1"
            suffix="%"
            onChange={(value) => updateField("commissionRate", value)}
          />
          <NumberField
            label="ค่าคอมโดยประมาณ"
            value={form.estimatedCommission}
            error={errors.estimatedCommission ?? errors.commission}
            min="0"
            suffix="บาท"
            onChange={(value) => updateField("estimatedCommission", value)}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">มุมคอนเทนต์</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="ศักยภาพในการทำคอนเทนต์"
            value={form.contentPotential}
            options={CONTENT_OPTIONS}
            onChange={(value) => updateField("contentPotential", value)}
            required
          />
          <TextField
            label="กลุ่มเป้าหมาย"
            value={form.targetAudience}
            error={errors.targetAudience}
            onChange={(value) => updateField("targetAudience", value)}
            required
          />
          <TextField
            label="Pain Point"
            value={form.painPoint}
            error={errors.painPoint}
            onChange={(value) => updateField("painPoint", value)}
            required
          />
          <TextField
            label="Benefit"
            value={form.benefit}
            error={errors.benefit}
            onChange={(value) => updateField("benefit", value)}
            required
          />
          <TextField
            label="ลิงก์สินค้า"
            value={form.productUrl}
            error={errors.productUrl}
            onChange={(value) => updateField("productUrl", value)}
            type="url"
          />
          <TextAreaField
            label="โน้ต"
            value={form.notes}
            onChange={(value) => updateField("notes", value)}
          />
        </div>
      </section>

      <button
        className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        type="submit"
      >
        วิเคราะห์สินค้า
      </button>
    </form>
  );
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.productName.trim()) errors.productName = "กรุณาใส่ชื่อสินค้า";
  if (!form.category.trim()) errors.category = "กรุณาใส่หมวดหมู่";
  if (!form.targetAudience.trim()) errors.targetAudience = "กรุณาใส่กลุ่มเป้าหมาย";
  if (!form.painPoint.trim()) errors.painPoint = "กรุณาใส่ Pain Point";
  if (!form.benefit.trim()) errors.benefit = "กรุณาใส่ Benefit";

  validateRequiredNumber(errors, "price", form.price, "กรุณาใส่ราคา");
  validateRequiredNumber(errors, "soldCount", form.soldCount, "กรุณาใส่ยอดขาย", {
    integerOnly: true,
  });
  validateRequiredNumber(errors, "rating", form.rating, "กรุณาใส่คะแนนรีวิว");
  validateRequiredNumber(errors, "reviewCount", form.reviewCount, "กรุณาใส่จำนวนรีวิว", {
    integerOnly: true,
  });

  const rating = Number(form.rating);
  if (form.rating && (rating < 0 || rating > 5)) {
    errors.rating = "คะแนนรีวิวต้องอยู่ระหว่าง 0-5";
  }

  const commissionRate = parseOptionalNumber(form.commissionRate);
  const estimatedCommission = parseOptionalNumber(form.estimatedCommission);

  if (commissionRate === undefined && estimatedCommission === undefined) {
    errors.commission = "กรุณาใส่เปอร์เซ็นต์คอม หรือค่าคอมโดยประมาณอย่างน้อย 1 ช่อง";
  }

  if (commissionRate !== undefined && (commissionRate < 0 || commissionRate > 100)) {
    errors.commissionRate = "เปอร์เซ็นต์คอมต้องอยู่ระหว่าง 0-100";
  }

  if (estimatedCommission !== undefined && estimatedCommission < 0) {
    errors.estimatedCommission = "ค่าคอมต้องไม่ติดลบ";
  }

  if (form.productUrl.trim() && !isValidUrl(form.productUrl)) {
    errors.productUrl = "ลิงก์สินค้าไม่ถูกต้อง";
  }

  return errors;
}

function validateRequiredNumber(
  errors: FormErrors,
  field: keyof FormState,
  value: string,
  message: string,
  options?: { integerOnly?: boolean },
) {
  if (!value.trim()) {
    errors[field] = message;
    return;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    errors[field] = "กรุณาใส่ตัวเลขที่ถูกต้อง";
    return;
  }

  if (options?.integerOnly && !Number.isInteger(parsed)) {
    errors[field] = "กรุณาใส่จำนวนเต็มเท่านั้น";
  }
}

function toProductInput(form: FormState): ProductInput {
  return {
    productName: form.productName.trim(),
    category: form.category.trim(),
    price: Number(form.price),
    soldCount: Number(form.soldCount),
    rating: Number(form.rating),
    reviewCount: Number(form.reviewCount),
    commissionRate: parseOptionalNumber(form.commissionRate),
    estimatedCommission: parseOptionalNumber(form.estimatedCommission),
    contentPotential: form.contentPotential,
    targetAudience: form.targetAudience.trim(),
    painPoint: form.painPoint.trim(),
    benefit: form.benefit.trim(),
    productUrl: form.productUrl.trim() || undefined,
    notes: form.notes.trim() || undefined,
  };
}

function parseOptionalNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

type TextFieldProps = {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "url";
};

function TextField({
  label,
  value,
  error,
  onChange,
  required,
  type = "text",
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </span>
      <input
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className="mt-1 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

type NumberFieldProps = TextFieldProps & {
  min?: string;
  max?: string;
  step?: string;
  suffix?: string;
};

function NumberField({
  label,
  value,
  error,
  onChange,
  required,
  min,
  max,
  step,
  suffix,
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </span>
      <div className="mt-1 flex rounded-lg border border-slate-300 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
        <input
          className="min-w-0 flex-1 rounded-lg border-0 bg-transparent px-3 py-2 text-base text-slate-950 outline-none"
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? (
          <span className="flex items-center px-3 text-sm text-slate-500">{suffix}</span>
        ) : null}
      </div>
      {error ? <span className="mt-1 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: ContentPotential;
  options: Array<{ value: ContentPotential; label: string }>;
  onChange: (value: ContentPotential) => void;
  required?: boolean;
};

function SelectField({ label, value, options, onChange, required }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </span>
      <select
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        value={value}
        onChange={(event) => onChange(event.target.value as ContentPotential)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <label className="block sm:col-span-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        className="mt-1 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
