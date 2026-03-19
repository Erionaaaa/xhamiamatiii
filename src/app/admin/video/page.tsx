import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminLoggedInAsync } from "@/lib/admin-auth";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function ensureUniqueVideoSlug(base: string, excludeId?: string) {
  const cleanBase = slugify(base);
  if (!cleanBase) return `video-${Date.now()}`;

  let candidate = cleanBase;
  let i = 2;

  // Make slug unique: base, base-2, base-3, ...
  // Cap attempts to avoid infinite loops.
  while (i < 100) {
    const existing = await prisma.video.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${cleanBase}-${i}`;
    i += 1;
  }

  return `${cleanBase}-${Date.now()}`;
}

async function createVideo(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const isFeatured = formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "on";

  if (!title || !youtubeUrl || !categoryId) {
    redirect("/admin/video");
  }

  const categoryExists = await prisma.videoCategory.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });
  if (!categoryExists) {
    redirect("/admin/video");
  }

  const baseSlug = slugRaw || title;
  const slug = await ensureUniqueVideoSlug(baseSlug);

  await prisma.video.create({
    data: {
      title,
      slug,
      youtubeUrl,
      description: description || null,
      categoryId,
      isFeatured,
      isActive,
    },
  });

  revalidatePath("/admin/video");
  redirect("/admin/video");
}

async function updateVideo(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const isFeatured = formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "on";

  if (!id) {
    redirect("/admin/video");
  }

  const baseSlug = slugRaw || title;
  const slug = baseSlug ? await ensureUniqueVideoSlug(baseSlug, id) : "";

  if (categoryId) {
    const categoryExists = await prisma.videoCategory.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!categoryExists) {
      redirect("/admin/video");
    }
  }

  await prisma.video.update({
    where: { id },
    data: {
      ...(title ? { title } : {}),
      ...(slug ? { slug } : {}),
      ...(youtubeUrl ? { youtubeUrl } : {}),
      description: description || null,
      ...(categoryId ? { categoryId } : {}),
      isFeatured,
      isActive,
    },
  });

  revalidatePath("/admin/video");
  redirect("/admin/video");
}

async function deleteVideo(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin/video");
  }

  await prisma.video.delete({ where: { id } });

  revalidatePath("/admin/video");
  redirect("/admin/video");
}

export default async function AdminVideoPage() {
  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const [categories, videos] = await Promise.all([
    prisma.videoCategory.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
    prisma.video.findMany({
      orderBy: [{ createdAt: "desc" }],
    }),
  ]);

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Menaxhimi i videove
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Këtu mund të shtosh video të reja në kategori, si dhe të
                ndryshosh ose fshish videot ekzistuese pa pasur nevojë të
                prekësh kodin.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <h2 className="text-base font-semibold tracking-tight">
                Shto video të re
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Mbush fushat më poshtë dhe shtyp &quot;Shto videon&quot;.
              </p>

              <form action={createVideo} className="mt-4 grid gap-3">
                <Field label="Titulli">
                  <input
                    name="title"
                    required
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Slug (opsionale – krijohet automatikisht)">
                  <input
                    name="slug"
                    placeholder="p.sh. rendesia-e-namazit"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="YouTube URL">
                  <input
                    name="youtubeUrl"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Kategoria">
                  <select
                    name="categoryId"
                    required
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Zgjidh kategorinë
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Përshkrimi (opsionale)">
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      className="h-3 w-3 rounded border-border/70 bg-background"
                    />
                    <span>Trego si e përzgjedhur (featured)</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      defaultChecked
                      className="h-3 w-3 rounded border-border/70 bg-background"
                    />
                    <span>Video aktive (shfaqet në faqe)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Shto videon
                </button>
              </form>
            </MotionCard>

            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold tracking-tight">
                  Video ekzistuese
                </h2>
                <div className="text-xs text-muted-foreground">
                  {videos.length} video në total
                </div>
              </div>

              {videos.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Ende nuk ka video në bazën e të dhënave.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {videos.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-2xl border border-border/70 bg-background p-4"
                    >
                      <form action={updateVideo}>
                        <input type="hidden" name="id" value={v.id} />
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1 space-y-2">
                            <Field label="Titulli">
                              <input
                                name="title"
                                defaultValue={v.title}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              />
                            </Field>
                            <Field label="Slug">
                              <input
                                name="slug"
                                defaultValue={v.slug}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              />
                            </Field>
                            <Field label="YouTube URL">
                              <input
                                name="youtubeUrl"
                                defaultValue={v.youtubeUrl}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              />
                            </Field>
                          </div>
                          <div className="mt-2 w-full space-y-2 md:mt-0 md:w-56">
                            <Field label="Kategoria">
                              <select
                                name="categoryId"
                                defaultValue={v.categoryId}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              >
                                {categories.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </Field>
                            <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                              <label className="inline-flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="isFeatured"
                                  defaultChecked={v.isFeatured}
                                  className="h-3 w-3 rounded border-border/70 bg-background"
                                />
                                <span>Featured</span>
                              </label>
                              <label className="inline-flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="isActive"
                                  defaultChecked={v.isActive}
                                  className="h-3 w-3 rounded border-border/70 bg-background"
                                />
                                <span>Aktive</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <Field label="Përshkrimi">
                          <textarea
                            name="description"
                            defaultValue={v.description ?? ""}
                            className="mt-2 w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            rows={2}
                          />
                        </Field>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            className="inline-flex h-8 items-center justify-center rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90"
                          >
                            Ruaj ndryshimet
                          </button>
                        </div>
                      </form>

                      <form
                        action={deleteVideo}
                        className="mt-2 inline-flex"
                      >
                        <input type="hidden" name="id" value={v.id} />
                        <button
                          type="submit"
                          className="inline-flex h-8 items-center justify-center rounded-full border border-red-500/70 bg-background px-4 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
                        >
                          Fshij
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </MotionCard>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

