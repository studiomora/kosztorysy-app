"use client";

import { useRef, useTransition } from "react";
import { createPriceItem } from "./actions";

export default function PriceItemForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          await createPriceItem(formData);
          formRef.current?.reset();
        });
      }}
      className="bg-white border border-neutral-200 rounded-xl p-4 grid grid-cols-12 gap-2 items-end"
    >
      <div className="col-span-2">
        <label className="block text-xs text-neutral-500 mb-1">Тип</label>
        <select name="category" className="w-full border rounded px-2 py-1.5 text-sm">
          <option value="robocizna">Робота</option>
          <option value="materialy">Матеріал</option>
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-xs text-neutral-500 mb-1">Валюта</label>
        <select name="currency" className="w-full border rounded px-2 py-1.5 text-sm">
          <option value="PLN">PLN</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="col-span-3">
        <label className="block text-xs text-neutral-500 mb-1">Назва</label>
        <input name="name" required className="w-full border rounded px-2 py-1.5 text-sm" />
      </div>
      <div className="col-span-1">
        <label className="block text-xs text-neutral-500 mb-1">Од.</label>
        <input name="unit" required placeholder="m²" className="w-full border rounded px-2 py-1.5 text-sm" />
      </div>
      <div className="col-span-1">
        <label className="block text-xs text-neutral-500 mb-1">Ціна</label>
        <input name="priceMin" required inputMode="decimal" className="w-full border rounded px-2 py-1.5 text-sm" />
      </div>
      <div className="col-span-1">
        <label className="block text-xs text-neutral-500 mb-1">Макс. (опц.)</label>
        <input name="priceMax" inputMode="decimal" className="w-full border rounded px-2 py-1.5 text-sm" />
      </div>
      <div className="col-span-2">
        <label className="block text-xs text-neutral-500 mb-1">Джерело</label>
        <input name="sourceNote" className="w-full border rounded px-2 py-1.5 text-sm" />
      </div>
      <div className="col-span-1">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded px-2 py-1.5 text-sm font-medium"
        >
          Додати
        </button>
      </div>
    </form>
  );
}
