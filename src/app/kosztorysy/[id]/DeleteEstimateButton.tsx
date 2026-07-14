"use client";

import { useTransition } from "react";
import { deleteEstimate } from "../actions";

export default function DeleteEstimateButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm("Видалити цей кошторис? Дію не можна скасувати.")) {
          startTransition(() => deleteEstimate(id));
        }
      }}
      disabled={isPending}
      className="border border-red-200 text-red-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 transition disabled:opacity-50"
    >
      Видалити
    </button>
  );
}
