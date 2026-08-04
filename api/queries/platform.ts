import { getDb } from "./connection";
import {
  applications,
  documents,
  freightBookings,
  contactMessages,
} from "../../db/schema";

function code(prefix: string) {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-2026-${n}`;
}

export async function createApplication(input: {
  role: "producer" | "buyer";
  company: string;
  cnpj?: string;
  email: string;
  phone?: string;
  country?: string;
  commodity?: string;
  termsAccepted: boolean;
  document?: { filename: string; mime: string; base64: string };
}) {
  const db = getDb();
  const applicationId = code("AGR");
  const { document, ...fields } = input;
  const result = await db.insert(applications).values({
    applicationId,
    ...fields,
  });
  const insertedId = Number(result[0].insertId);
  if (document) {
    const size = Buffer.from(document.base64, "base64").length;
    await db.insert(documents).values({
      applicationId: insertedId,
      filename: document.filename,
      mime: document.mime,
      size,
      data: document.base64,
    });
  }
  return { applicationId };
}

export async function createFreightBooking(input: {
  origin: string;
  destination: string;
  volumeMt: number;
  cargoType?: string;
  incoterm?: string;
  loadDate?: string;
  totalUsd?: number;
  name: string;
  company: string;
  email?: string;
}) {
  const db = getDb();
  const referenceCode = code("BKF");
  await db.insert(freightBookings).values({ referenceCode, ...input });
  return { referenceCode };
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  topic?: string;
  message: string;
}) {
  const db = getDb();
  await db.insert(contactMessages).values(input);
  return { ok: true };
}
