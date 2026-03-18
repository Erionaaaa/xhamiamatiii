import { PrismaClient } from "@prisma/client";
import path from "path";

const dbUrl = process.env.DATABASE_URL;
if (dbUrl?.startsWith("file:")) {
  const sqlitePath = dbUrl.slice(5);
  if (sqlitePath && !path.isAbsolute(sqlitePath)) {
    const resolved = path.resolve(process.cwd(), "prisma", sqlitePath);
    process.env.DATABASE_URL = `file:${resolved}`;
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

