import { db } from "@/db";
import { estimates, estimateItems } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";
import { formatMoney, toNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function KosztorysyPage() {
  const list = await db.select().from(estimates).orderBy(desc(estimates.createdAt));

  const totals = await db
    .select({
      estimateId: estimateItems.estimateId,
      total: sql<string>`sum(${estimateItems.quantity} * ${estimateItems.unitPrice})`,
    })
    .from(estimateItems)
    .groupBy(estimateItems.estimateId);

  const totalsMap = new Map(totals.map((t) => [t.estimateId, toNumber(t.total)]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Кошториси</h1>
        <Link
          href="/kosztorysy/new"
          className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
        >
          + Новий кошторис
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-neutral-400">Кошторисів ще немає. Створи перший.</p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 text-xs border-b border-neutral-100">
                <th className="py-2 px-3 font-medium">Клієнт</th>
                <th className="py-2 px-3 font-medium">Дата</th>
                <th className="py-2 px-3 font-medium">Сума (брутто)</th>
                <th className="py-2 px-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((e) => {
                const netto = totalsMap.get(e.id) ?? 0;
                const vat = netto * (toNumber(e.vatRate) / 100);
                return (
                  <tr key={e.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="py-2 px-3">{e.clientName}</td>
                    <td className="py-2 px-3 text-neutral-500">{e.date}</td>
                    <td className="py-2 px-3">
                      {formatMoney(netto + vat, e.currency as "PLN" | "EUR")}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <Link href={`/kosztorysy/${e.id}`} className="text-neutral-600 hover:text-neutral-900">
                        Відкрити →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
