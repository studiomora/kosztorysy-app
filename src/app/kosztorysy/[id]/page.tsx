import { db } from "@/db";
import { estimates, estimateItems, type EstimateItem } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatMoney, toNumber } from "@/lib/format";
import DeleteEstimateButton from "./DeleteEstimateButton";

export const dynamic = "force-dynamic";

export default async function EstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const estimateId = Number(id);
  if (!Number.isFinite(estimateId)) notFound();

  const [estimate] = await db.select().from(estimates).where(eq(estimates.id, estimateId));
  if (!estimate) notFound();

  const items = await db
    .select()
    .from(estimateItems)
    .where(eq(estimateItems.estimateId, estimateId))
    .orderBy(asc(estimateItems.sortOrder));

  const currency = estimate.currency as "PLN" | "EUR";
  const roboty = items.filter((i) => i.section === "robocizna");
  const materialy = items.filter((i) => i.section === "materialy");

  const sectionTotal = (arr: EstimateItem[]) =>
    arr.reduce((sum, i) => sum + toNumber(i.quantity) * toNumber(i.unitPrice), 0);

  const robotyTotal = sectionTotal(roboty);
  const materialyTotal = sectionTotal(materialy);
  const netto = robotyTotal + materialyTotal;
  const vatRate = toNumber(estimate.vatRate);
  const vat = netto * (vatRate / 100);
  const brutto = netto + vat;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{estimate.clientName}</h1>
          <p className="text-sm text-neutral-500">
            {estimate.city}, {estimate.date} · ПДВ {vatRate}% · {currency}
            {estimate.validUntil ? ` · дійсний до ${estimate.validUntil}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/kosztorysy/${estimate.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
          >
            Завантажити PDF
          </a>
          <DeleteEstimateButton id={estimate.id} />
        </div>
      </div>

      {roboty.length > 0 && <Section title="Роботи" items={roboty} currency={currency} total={robotyTotal} />}
      {materialy.length > 0 && (
        <Section title="Матеріали" items={materialy} currency={currency} total={materialyTotal} />
      )}

      <div className="bg-white border border-neutral-200 rounded-xl p-4 max-w-sm ml-auto space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Netto</span>
          <span>{formatMoney(netto, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">VAT ({vatRate}%)</span>
          <span>{formatMoney(vat, currency)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t">
          <span>Brutto</span>
          <span>{formatMoney(brutto, currency)}</span>
        </div>
      </div>

      {estimate.notes && <p className="text-sm text-neutral-500 whitespace-pre-wrap">{estimate.notes}</p>}
    </div>
  );
}

function Section({
  title,
  items,
  currency,
  total,
}: {
  title: string;
  items: EstimateItem[];
  currency: "PLN" | "EUR";
  total: number;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-neutral-700 mb-2 uppercase tracking-wide">{title}</h2>
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-500 text-xs border-b border-neutral-100">
              <th className="py-2 px-3 font-medium">Назва</th>
              <th className="py-2 px-3 font-medium">Од.</th>
              <th className="py-2 px-3 font-medium">Кількість</th>
              <th className="py-2 px-3 font-medium">Ціна/од.</th>
              <th className="py-2 px-3 font-medium">Сума</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-neutral-100">
                <td className="py-2 px-3">{item.name}</td>
                <td className="py-2 px-3 text-neutral-500">{item.unit}</td>
                <td className="py-2 px-3">{item.quantity}</td>
                <td className="py-2 px-3">{formatMoney(item.unitPrice, currency)}</td>
                <td className="py-2 px-3">
                  {formatMoney(toNumber(item.quantity) * toNumber(item.unitPrice), currency)}
                </td>
              </tr>
            ))}
            <tr className="border-t border-neutral-200 font-medium bg-neutral-50">
              <td className="py-2 px-3" colSpan={4}>
                Разом
              </td>
              <td className="py-2 px-3">{formatMoney(total, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
