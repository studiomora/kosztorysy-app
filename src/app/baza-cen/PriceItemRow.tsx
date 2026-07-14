"use client";

import { useState, useTransition } from "react";
import type { PriceItem } from "@/db/schema";
import { updatePriceItem, deletePriceItem } from "./actions";

export default function PriceItemRow({ item }: { item: PriceItem }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const updateWithId = updatePriceItem.bind(null, item.id);

  if (editing) {
    return (
      <tr className="bg-amber-50">
        <td colSpan={5} className="p-3">
          <form
            action={(formData) => {
              startTransition(async () => {
                await updateWithId(formData);
                setEditing(false);
              });
            }}
            className="grid grid-cols-12 gap-2 items-center"
          >
            <input
              name="name"
              defaultValue={item.name}
              className="col-span-4 border rounded px-2 py-1 text-sm"
              required
            />
            <input
              name="unit"
              defaultValue={item.unit}
              className="col-span-1 border rounded px-2 py-1 text-sm"
              required
            />
            <input
              name="priceMin"
              defaultValue={item.priceMin}
              className="col-span-2 border rounded px-2 py-1 text-sm"
              required
            />
            <input
              name="priceMax"
              defaultValue={item.priceMax ?? ""}
              placeholder="макс. (опц.)"
              className="col-span-2 border rounded px-2 py-1 text-sm"
            />
            <input
              name="sourceNote"
              defaultValue={item.sourceNote ?? ""}
              placeholder="джерело"
              className="col-span-2 border rounded px-2 py-1 text-sm"
            />
            <div className="col-span-1 flex gap-1">
              <button
                type="submit"
                disabled={isPending}
                className="text-xs bg-neutral-900 text-white rounded px-2 py-1"
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs bg-neutral-200 rounded px-2 py-1"
              >
                ✕
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-neutral-100 hover:bg-neutral-50">
      <td className="py-2 pr-3">{item.name}</td>
      <td className="py-2 pr-3 text-neutral-500">{item.unit}</td>
      <td className="py-2 pr-3 whitespace-nowrap">
        {item.priceMin}
        {item.priceMax ? ` – ${item.priceMax}` : ""} {item.currency}
      </td>
      <td className="py-2 pr-3 text-neutral-400 text-xs">{item.sourceNote}</td>
      <td className="py-2 text-right whitespace-nowrap">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-neutral-500 hover:text-neutral-900 mr-3"
        >
          Редагувати
        </button>
        <button
          onClick={() => {
            if (confirm(`Видалити «${item.name}»?`)) {
              startTransition(() => deletePriceItem(item.id));
            }
          }}
          disabled={isPending}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Видалити
        </button>
      </td>
    </tr>
  );
}
