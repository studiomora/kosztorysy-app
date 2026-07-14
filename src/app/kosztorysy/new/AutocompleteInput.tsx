"use client";

import { useMemo, useState } from "react";
import type { PriceItem } from "@/db/schema";

export default function AutocompleteInput({
  value,
  options,
  onChange,
  onSelect,
  placeholder,
}: {
  value: string;
  options: PriceItem[];
  onChange: (value: string) => void;
  onSelect: (item: PriceItem) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options.filter((o) => o.name.toLowerCase().includes(q)).slice(0, 8);
  }, [value, options]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={placeholder ?? "Назва позиції..."}
        className="w-full border rounded px-2 py-1.5 text-sm"
      />
      {focused && matches.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto bg-white border border-neutral-200 rounded-lg shadow-lg text-sm">
          {matches.map((m) => (
            <button
              type="button"
              key={m.id}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(m);
                setFocused(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center justify-between gap-2"
            >
              <span className="truncate">{m.name}</span>
              <span className="text-neutral-400 whitespace-nowrap text-xs">
                {m.priceMin}
                {m.priceMax ? `–${m.priceMax}` : ""} {m.currency}/{m.unit}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
