"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./login/actions";

export default function Nav() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      pathname.startsWith(href)
        ? "bg-neutral-900 text-white"
        : "text-neutral-600 hover:bg-neutral-200"
    }`;

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-900">Kosztorysy</span>
          <span className="text-neutral-300">·</span>
          <span className="text-sm text-neutral-500">Brodacze z Lasu</span>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/kosztorysy" className={linkClass("/kosztorysy")}>
            Кошториси
          </Link>
          <Link href="/baza-cen" className={linkClass("/baza-cen")}>
            База цін
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
            >
              Вийти
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
