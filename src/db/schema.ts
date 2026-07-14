import {
  pgTable,
  serial,
  varchar,
  numeric,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

// Позиція в базі цін (робота або матеріал), окремо для PLN та EUR.
export const priceItems = pgTable("price_items", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 32 }).notNull(), // 'robocizna' | 'materialy'
  currency: varchar("currency", { length: 3 }).notNull(), // 'PLN' | 'EUR'
  name: text("name").notNull(),
  unit: varchar("unit", { length: 32 }).notNull(),
  // Якщо ціна фіксована — заповнюємо тільки priceMin.
  // Якщо це вилка (як у деяких кошторисах) — заповнюємо priceMin і priceMax.
  priceMin: numeric("price_min", { precision: 10, scale: 2 }).notNull(),
  priceMax: numeric("price_max", { precision: 10, scale: 2 }),
  sourceNote: text("source_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Кошторис (шапка документа).
export const estimates = pgTable("estimates", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientAddress: text("client_address"),
  clientNip: varchar("client_nip", { length: 32 }),
  city: varchar("city", { length: 64 }).default("Kraków"),
  date: varchar("date", { length: 16 }).notNull(), // 'YYYY-MM-DD'
  currency: varchar("currency", { length: 3 }).notNull().default("PLN"),
  vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull().default("8"),
  validUntil: varchar("valid_until", { length: 16 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Рядок кошторису.
export const estimateItems = pgTable("estimate_items", {
  id: serial("id").primaryKey(),
  estimateId: integer("estimate_id")
    .notNull()
    .references(() => estimates.id, { onDelete: "cascade" }),
  section: varchar("section", { length: 16 }).notNull(), // 'robocizna' | 'materialy'
  name: text("name").notNull(),
  unit: varchar("unit", { length: 32 }).notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type PriceItem = typeof priceItems.$inferSelect;
export type NewPriceItem = typeof priceItems.$inferInsert;
export type Estimate = typeof estimates.$inferSelect;
export type EstimateItem = typeof estimateItems.$inferSelect;
export type NewEstimateItem = typeof estimateItems.$inferInsert;
