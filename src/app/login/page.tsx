import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <form
        action={loginAction}
        className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-sm space-y-4"
      >
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">Kosztorysy</h1>
          <p className="text-sm text-neutral-500">Brodacze z Lasu — вхід у застосунок</p>
        </div>
        <input type="hidden" name="from" value={params.from ?? "/"} />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          autoFocus
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
        {params.error && (
          <p className="text-sm text-red-600">Невірний пароль, спробуй ще раз.</p>
        )}
        <button
          type="submit"
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg py-2 font-medium transition"
        >
          Увійти
        </button>
      </form>
    </div>
  );
}
