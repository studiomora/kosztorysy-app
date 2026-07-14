"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import type { PriceItem } from "@/db/schema";
import { createEstimate } from "../actions";
import AutocompleteInput from "./AutocompleteInput";
import { formatMoney } from "@/lib/format";

type Section = "robocizna" | "materialy";

type Row = {
  key: string;
  section: Section;
  name: string;
  unit: string;
  quantity: string;
  unitPrice: string;
};

let rowCounter = 0;
function newRow(section: Section): Row {
  rowCounter += 1;
  return { key: `row-${rowCounter}`, section, name: "", unit: "", quantity: "1", unitPrice: "" };
}

export default function EstimateBuilder({ priceItems }: { priceItems: PriceItem[] }) {
  const today = new Date().toISOString().slice(0, 10);

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientNip, setClientNip] = useState("");
  const [city, setCity] = useState("Kraków");
  const [date, setDate] = useState(today);
  const [currency, setCurrency] = useState<"PLN" | "EUR">("PLN");
  const [vatRate, setVatRate] = useState("8");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState(
    "Cena może ulec zmianie w zależności od cen materiałów oraz dodatkowych prac nieustalonych przed rozpoczęciem."
  );

  const [rows, setRows] = useState<Row[]>([newRow("robocizna"), newRow("materialy")]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const optionsForCurrency = useMemo(
    () => priceItems.filter((p) => p.currency === currency),
    [priceItems, currency]
  );

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function removeRow(key: string) {
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  function addRow(section: Section) {
    setRows((prev) => [...prev, newRow(section)]);
  }

  function handleCurrencyChange(next: "PLN" | "EUR") {
    setCurrency(next);
    setVatRate(next === "PLN" ? "8" : "21");
  }

  const sections: { key: Section; title: string }[] = [
    { key: "robocizna", title: "Роботи" },
    { key: "materialy", title: "Матеріали" },
  ];

  function sectionRows(section: Section) {
    return rows.filter((r) => r.section === section);
  }

  function rowTotal(row: Row) {
    const q = parseFloat(row.quantity.replace(",", ".")) || 0;
    const p = parseFloat(row.unitPrice.replace(",", ".")) || 0;
    return q * p;
  }

  function sectionTotal(section: Section) {
    return sectionRows(section).reduce((sum, r) => sum + rowTotal(r), 0);
  }

  const netto = sectionTotal("robocizna") + sectionTotal("materialy");
  const vat = netto * (parseFloat(vatRate || "0") / 100);
  const brutto = netto + vat;

  async function handleSubmit() {
    setError(null);
    if (!clientName.trim()) {
      setError("Вкажи ім'я/назву клієнта.");
      return;
    }
    const validRows = rows.filter((r) => r.name.trim() && r.unit.trim() && r.quantity && r.unitPrice);
    if (validRows.length === 0) {
      setError("Додай хоча б одну позицію з назвою, одиницею, кількістю та ціною.");
      return;
    }

    startTransition(async () => {
      await createEstimate({
        clientName: clientName.trim(),
        clientAddress: clientAddress.trim() || undefined,
        clientNip: clientNip.trim() || undefined,
        city: city.trim() || undefined,
        date,
        currency,
        vatRate: parseFloat(vatRate) || 0,
        validUntil: validUntil || undefined,
        notes: notes.trim() || undefined,
        items: validRows.map((r) => ({
          section: r.section,
          name: r.name.trim(),
          unit: r.unit.trim(),
          quantity: parseFloat(r.quantity.replace(",", ".")) || 0,
          unitPrice: parseFloat(r.unitPrice.replace(",", ".")) || 0,
        })),
      });
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-200 rounded-xl p-4 grid grid-cols-12 gap-3">
        <Field label="Клієнт" className="col-span-4">
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="input" />
        </Field>
        <Field label="Адреса" className="col-span-4">
          <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="input" />
        </Field>
        <Field label="NIP" className="col-span-2">
          <input value={clientNip} onChange={(e) => setClientNip(e.target.value)} className="input" />
        </Field>
        <Field label="Місто" className="col-span-2">
          <input value={city} onChange={(e) => setCity(e.target.value)} className="input" />
        </Field>

        <Field label="Дата" className="col-span-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
        </Field>
        <Field label="Дійсний до" className="col-span-2">
          <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="input" />
        </Field>
        <Field label="Валюта" className="col-span-2">
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as "PLN" | "EUR")}
            className="input"
          >
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>
        <Field label="ПДВ, %" className="col-span-2">
          <input value={vatRate} onChange={(e) => setVatRate(e.target.value)} className="input" />
        </Field>
        <Field label="Примітка" className="col-span-4">
          <input value={notes} onChange={(e) => setNotes(e.target.value)} className="input" />
        </Field>
      </div>

      {sections.map((s) => (
        <div key={s.key}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">{s.title}</h2>
            <button
              type="button"
              onClick={() => addRow(s.key)}
              className="text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg px-3 py-1.5 font-medium"
            >
              + рядок
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-visible">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 text-xs border-b border-neutral-100">
                  <th className="py-2 px-3 font-medium w-[40%]">Назва</th>
                  <th className="py-2 px-3 font-medium">Од.</th>
                  <th className="py-2 px-3 font-medium">К-сть</th>
                  <th className="py-2 px-3 font-medium">Ціна/од.</th>
                  <th className="py-2 px-3 font-medium">Сума</th>
                  <th className="py-2 px-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {sectionRows(s.key).map((row) => (
                  <tr key={row.key} className="border-t border-neutral-100 align-top">
                    <td className="py-2 px-3">
                      <AutocompleteInput
                        value={row.name}
                        options={optionsForCurrency.filter((o) => o.category === s.key)}
                        onChange={(v) => updateRow(row.key, { name: v })}
                        onSelect={(item) =>
                          updateRow(row.key, {
                            name: item.name,
                            unit: item.unit,
                            unitPrice: item.priceMin,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        value={row.unit}
                        onChange={(e) => updateRow(row.key, { unit: e.target.value })}
                        className="w-16 border rounded px-2 py-1.5 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        value={row.quantity}
                        onChange={(e) => updateRow(row.key, { quantity: e.target.value })}
                        inputMode="decimal"
                        className="w-20 border rounded px-2 py-1.5 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        value={row.unitPrice}
                        onChange={(e) => updateRow(row.key, { unitPrice: e.target.value })}
                        inputMode="decimal"
                        className="w-24 border rounded px-2 py-1.5 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3 text-neutral-600 whitespace-nowrap">
                      {formatMoney(rowTotal(row), currency)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeRow(row.key)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-neutral-200 bg-neutral-50 font-medium">
                  <td className="py-2 px-3" colSpan={4}>
                    Разом ({s.title.toLowerCase()})
                  </td>
                  <td className="py-2 px-3" colSpan={2}>
                    {formatMoney(sectionTotal(s.key), currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="bg-white border border-neutral-200 rounded-xl p-4 max-w-sm ml-auto space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Netto</span>
          <span>{formatMoney(netto, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">VAT ({vatRate || 0}%)</span>
          <span>{formatMoney(vat, currency)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t">
          <span>Brutto</span>
          <span>{formatMoney(brutto, currency)}</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition disabled:opacity-50"
        >
          {isPending ? "Зберігаю..." : "Створити кошторис"}
        </button>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e5e5;
          border-radius: 0.5rem;
          padding: 0.375rem 0.5rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
