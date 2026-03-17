import { PrismaClient } from "@prisma/client";
import path from "path";


const dbUrl = process.env.DATABASE_URL;
if (dbUrl?.startsWith("file:./") || dbUrl?.startsWith("file:../")) {
  process.env.DATABASE_URL = `file:${path.resolve(dbUrl.slice(5))}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

