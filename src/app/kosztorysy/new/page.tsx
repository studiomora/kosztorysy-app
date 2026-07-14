import { db } from "@/db";
import { priceItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import EstimateBuilder from "./EstimateBuilder";

export const dynamic = "force-dynamic";

export default async function NewEstimatePage() {
  const items = await db.select().from(priceItems).orderBy(asc(priceItems.name));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Новий кошторис</h1>
      <EstimateBuilder priceItems={items} />
    </div>
  );
}
