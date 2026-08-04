import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  createApplication,
  createFreightBooking,
  createContactMessage,
} from "./queries/platform";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  applications: createRouter({
    submit: publicQuery
      .input(
        z.object({
          role: z.enum(["producer", "buyer"]),
          company: z.string().min(2).max(255),
          cnpj: z.string().max(32).optional(),
          email: z.string().email().max(255),
          phone: z.string().max(64).optional(),
          country: z.string().max(128).optional(),
          commodity: z.string().max(128).optional(),
          termsAccepted: z.literal(true),
          document: z
            .object({
              filename: z.string().max(255),
              mime: z.string().max(128),
              base64: z.string().max(14_000_000), // ~10MB binary
            })
            .optional(),
        })
      )
      .mutation(({ input }) => createApplication(input)),
  }),

  freight: createRouter({
    book: publicQuery
      .input(
        z.object({
          origin: z.string().min(1).max(128),
          destination: z.string().min(1).max(128),
          volumeMt: z.number().int().positive().max(1_000_000),
          cargoType: z.string().max(64).optional(),
          incoterm: z.string().max(16).optional(),
          loadDate: z.string().max(32).optional(),
          totalUsd: z.number().int().nonnegative().optional(),
          name: z.string().min(2).max(255),
          company: z.string().min(2).max(255),
          email: z.string().email().max(255).optional(),
        })
      )
      .mutation(({ input }) => createFreightBooking(input)),
  }),

  contact: createRouter({
    send: publicQuery
      .input(
        z.object({
          name: z.string().min(2).max(255),
          email: z.string().email().max(255),
          topic: z.string().max(128).optional(),
          message: z.string().min(10).max(5000),
        })
      )
      .mutation(({ input }) => createContactMessage(input)),
  }),
});

export type AppRouter = typeof appRouter;
