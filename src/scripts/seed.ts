/**
 * Заповнює таблицю price_items стартовою базою цін.
 * Запуск: npm run db:seed
 * (спершу виконай `npm run db:push`, щоб створити таблиці в Neon)
 */
import "dotenv/config";
import { db } from "../db";
import { priceItems } from "../db/schema";
import { seedItems } from "../db/seed-data";

async function main() {
  console.log(`Заповнюю базу цін: ${seedItems.length} позицій...`);

  const existing = await db.select({ id: priceItems.id }).from(priceItems).limit(1);
  if (existing.length > 0) {
    console.log(
      "У таблиці price_items вже є дані. Якщо хочеш перезаповнити з нуля, спочатку очисти таблицю вручну (TRUNCATE price_items) і запусти сід ще раз."
    );
    process.exit(0);
  }

  await db.insert(priceItems).values(seedItems);
  console.log("Готово! База цін заповнена.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Помилка при заповненні бази цін:", err);
  process.exit(1);
});
