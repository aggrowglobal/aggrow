import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  boolean,
  longtext,
} from "drizzle-orm/mysql-core";

export const applications = mysqlTable("applications", {
  id: serial("id").primaryKey(),
  applicationId: varchar("application_id", { length: 32 }).notNull().unique(),
  role: mysqlEnum("role", ["producer", "buyer"]).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 32 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  country: varchar("country", { length: 128 }),
  commodity: varchar("commodity", { length: 128 }),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const documents = mysqlTable("documents", {
  id: serial("id").primaryKey(),
  applicationId: bigint("application_id", { mode: "number", unsigned: true }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mime: varchar("mime", { length: 128 }).notNull(),
  size: int("size").notNull(),
  data: longtext("data").notNull(), // base64-encoded file bytes
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const freightBookings = mysqlTable("freight_bookings", {
  id: serial("id").primaryKey(),
  referenceCode: varchar("reference_code", { length: 32 }).notNull().unique(),
  origin: varchar("origin", { length: 128 }).notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  volumeMt: int("volume_mt").notNull(),
  cargoType: varchar("cargo_type", { length: 64 }),
  incoterm: varchar("incoterm", { length: 16 }),
  loadDate: varchar("load_date", { length: 32 }),
  totalUsd: int("total_usd"),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = mysqlTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 128 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Application = typeof applications.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type FreightBooking = typeof freightBookings.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
