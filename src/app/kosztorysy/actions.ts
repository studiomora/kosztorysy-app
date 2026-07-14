"use server";

import { db } from "@/db";
import { estimates, estimateItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type EstimateItemInput = {
  section: "robocizna" | "materialy";
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
};

export type CreateEstimateInput = {
  clientName: string;
  clientAddress?: string;
  clientNip?: string;
  city?: string;
  date: string;
  currency: "PLN" | "EUR";
  vatRate: number;
  validUntil?: string;
  notes?: string;
  items: EstimateItemInput[];
};

export async function createEstimate(data: CreateEstimateInput) {
  const [estimate] = await db
    .insert(estimates)
    .values({
      clientName: data.clientName,
      clientAddress: data.clientAddress || null,
      clientNip: data.clientNip || null,
      city: data.city || "Kraków",
      date: data.date,
      currency: data.currency,
      vatRate: data.vatRate.toFixed(2),
      validUntil: data.validUntil || null,
      notes: data.notes || null,
    })
    .returning();

  if (data.items.length > 0) {
    await db.insert(estimateItems).values(
      data.items.map((item, idx) => ({
        estimateId: estimate.id,
        section: item.section,
        name: item.name,
        unit: item.unit,
        quantity: item.quantity.toFixed(2),
        unitPrice: item.unitPrice.toFixed(2),
        sortOrder: idx,
      }))
    );
  }

  revalidatePath("/kosztorysy");
  redirect(`/kosztorysy/${estimate.id}`);
}

export async function deleteEstimate(id: number) {
  await db.delete(estimates).where(eq(estimates.id, id));
  revalidatePath("/kosztorysy");
  redirect("/kosztorysy");
}
