import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 60 * 60; // 1 orë

function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  );

  const staticPaths = [
    "/",
    "/orari",
    "/video",
    "/akademia",
    "/ajete",
    "/aktivitete",
    "/xhamia",
    "/kontakt",
    "/donacione",
  ] as const;

  const [academyPosts, activities, videoCategories] = await Promise.all([
    prisma.academyPost.findMany({
      where: { isActive: true },
      select: { slug: true, publishedAt: true, updatedAt: true, createdAt: true },
    }),
    prisma.activity.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    }),
    prisma.videoCategory.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    }),
  ]);

  return [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path === "/" ? "" : path}`,
      lastModified: new Date(),
    })),

    ...academyPosts.map((p) => ({
      url: `${baseUrl}/akademia/${p.slug}`,
      lastModified: (p.updatedAt ?? p.publishedAt ?? p.createdAt) as
        | Date
        | undefined,
    })),

    ...activities.map((a) => ({
      url: `${baseUrl}/aktivitete/${a.slug}`,
      lastModified: (a.updatedAt ?? a.createdAt) as Date | undefined,
    })),

    ...videoCategories.map((c) => ({
      url: `${baseUrl}/video/${c.slug}`,
      lastModified: (c.updatedAt ?? c.createdAt) as Date | undefined,
    })),
  ];
}

