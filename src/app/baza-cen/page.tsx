import { db } from "@/db";
import { priceItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import PriceItemForm from "./PriceItemForm";
import PriceItemRow from "./PriceItemRow";

export const dynamic = "force-dynamic";

const GROUPS: { category: "robocizna" | "materialy"; currency: "PLN" | "EUR"; title: string }[] = [
  { category: "robocizna", currency: "PLN", title: "Робота — PLN (Краків)" },
  { category: "materialy", currency: "PLN", title: "Матеріали — PLN (Краків)" },
  { category: "robocizna", currency: "EUR", title: "Робота — EUR (Іспанія)" },
  { category: "materialy", currency: "EUR", title: "Матеріали — EUR (Іспанія)" },
];

export default async function BazaCenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const all = await db.select().from(priceItems).orderBy(asc(priceItems.name));
  const filtered = query ? all.filter((i) => i.name.toLowerCase().includes(query)) : all;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">База цін</h1>
          <p className="text-sm text-neutral-500">
            {all.length} позицій. Ці ціни підтягуються автоматично при створенні кошторису.
          </p>
        </div>
        <form className="flex gap-2">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Пошук по назві..."
            className="border rounded-lg px-3 py-1.5 text-sm w-64"
          />
          <button type="submit" className="text-sm bg-neutral-900 text-white rounded-lg px-3 py-1.5">
            Знайти
          </button>
        </form>
      </div>

      <PriceItemForm />

      {GROUPS.map((group) => {
        const items = filtered.filter(
          (i) => i.category === group.category && i.currency === group.currency
        );
        if (items.length === 0) return null;
        return (
          <div key={`${group.category}-${group.currency}`}>
            <h2 className="text-sm font-semibold text-neutral-700 mb-2 uppercase tracking-wide">
              {group.title} <span className="text-neutral-400 font-normal">({items.length})</span>
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-500 text-xs border-b border-neutral-100">
                    <th className="py-2 px-3 font-medium">Назва</th>
                    <th className="py-2 px-3 font-medium">Од.</th>
                    <th className="py-2 px-3 font-medium">Ціна</th>
                    <th className="py-2 px-3 font-medium">Джерело</th>
                    <th className="py-2 px-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <PriceItemRow key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-sm text-neutral-400">
          База цін порожня. Заповни її командою <code>npm run db:seed</code> або додай позиції вручну вище.
        </p>
      )}
    </div>
  );
}
