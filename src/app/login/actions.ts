"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function sha256Hex(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/");
  const appPassword = process.env.APP_PASSWORD;

  if (appPassword && password === appPassword) {
    const hash = await sha256Hex(appPassword);
    const cookieStore = await cookies();
    cookieStore.set("kosztorysy_auth", hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect(from || "/");
  }

  redirect(`/login?error=1&from=${encodeURIComponent(from)}`);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kosztorysy_auth");
  redirect("/login");
}
