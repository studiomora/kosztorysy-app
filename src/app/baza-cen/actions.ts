"use server";

import { db } from "@/db";
import { priceItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function parseOptionalNumber(value: FormDataEntryValue | null): string | null {
  if (value === null) return null;
  const str = String(value).trim().replace(",", ".");
  if (str === "") return null;
  const num = parseFloat(str);
  return Number.isFinite(num) ? num.toFixed(2) : null;
}

export async function createPriceItem(formData: FormData) {
  const category = String(formData.get("category") ?? "robocizna");
  const currency = String(formData.get("currency") ?? "PLN");
  const name = String(formData.get("name") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const priceMin = parseOptionalNumber(formData.get("priceMin")) ?? "0.00";
  const priceMax = parseOptionalNumber(formData.get("priceMax"));
  const sourceNote = String(formData.get("sourceNote") ?? "").trim() || null;

  if (!name || !unit) return;

  await db.insert(priceItems).values({
    category,
    currency,
    name,
    unit,
    priceMin,
    priceMax,
    sourceNote,
  });

  revalidatePath("/baza-cen");
}

export async function updatePriceItem(id: number, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const priceMin = parseOptionalNumber(formData.get("priceMin")) ?? "0.00";
  const priceMax = parseOptionalNumber(formData.get("priceMax"));
  const sourceNote = String(formData.get("sourceNote") ?? "").trim() || null;

  if (!name || !unit) return;

  await db
    .update(priceItems)
    .set({ name, unit, priceMin, priceMax, sourceNote, updatedAt: new Date() })
    .where(eq(priceItems.id, id));

  revalidatePath("/baza-cen");
}

export async function deletePriceItem(id: number) {
  await db.delete(priceItems).where(eq(priceItems.id, id));
  revalidatePath("/baza-cen");
}
