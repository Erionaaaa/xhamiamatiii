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

async function ensureUniqueAcademySlug(base: string, excludeId?: string) {
  const cleanBase = slugify(base);
  if (!cleanBase) return `akademia-${Date.now()}`;

  let candidate = cleanBase;
  let i = 2;

  while (i < 100) {
    const existing = await prisma.academyPost.findFirst({
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

function parseDateTimeInput(value: string) {
  const normalized = value.trim();
  if (!normalized) return null;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function formatDateTimeForInput(value?: Date | null) {
  if (!value) return "";
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

async function createAcademyPost(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const isActive = formData.get("isActive") !== "off";

  if (!title || !content) {
    redirect("/admin/akademia");
  }

  const slug = await ensureUniqueAcademySlug(slugRaw || title);

  await prisma.academyPost.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      publishedAt: parseDateTimeInput(publishedAtRaw),
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/akademia");
  revalidatePath("/admin/akademia");
  redirect("/admin/akademia");
}

async function updateAcademyPost(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const isActive = formData.get("isActive") !== "off";

  if (!id || !title || !content) {
    redirect("/admin/akademia");
  }

  const existing = await prisma.academyPost.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existing) {
    redirect("/admin/akademia");
  }

  const slug = await ensureUniqueAcademySlug(slugRaw || title, id);

  await prisma.academyPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      publishedAt: parseDateTimeInput(publishedAtRaw),
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/akademia");
  revalidatePath(`/akademia/${existing.slug}`);
  revalidatePath(`/akademia/${slug}`);
  revalidatePath("/admin/akademia");
  redirect("/admin/akademia");
}

async function deleteAcademyPost(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin/akademia");
  }

  const existing = await prisma.academyPost.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existing) {
    redirect("/admin/akademia");
  }

  await prisma.academyPost.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/akademia");
  revalidatePath(`/akademia/${existing.slug}`);
  revalidatePath("/admin/akademia");
  redirect("/admin/akademia");
}

export default async function AdminAcademyPage() {
  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const posts = await prisma.academyPost.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Menaxhimi i Akademisë
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Këtu mund të shtosh artikuj të Akademisë, foto, tekst, përmbledhje
                dhe datë publikimi pa prekur kodin.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <h2 className="text-base font-semibold tracking-tight">
                Shto postim të ri
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Te foto, përdor path nga public p.sh. /academy.jpg ose /inside.jpg
              </p>

              <form action={createAcademyPost} className="mt-4 grid gap-3">
                <Field label="Titulli">
                  <input
                    name="title"
                    required
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Slug (opsionale)">
                  <input
                    name="slug"
                    placeholder="p.sh. kurs-praktik-abdesi"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Foto (opsionale)">
                  <input
                    name="coverImage"
                    placeholder="/academy.jpg"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Përmbledhje (opsionale)">
                  <textarea
                    name="excerpt"
                    rows={2}
                    className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Përmbajtja">
                  <textarea
                    name="content"
                    required
                    rows={6}
                    className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Data e publikimit (opsionale)">
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked
                    className="h-3 w-3 rounded border-border/70 bg-background"
                  />
                  <span>Postim aktiv (shfaqet në faqe)</span>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Shto postimin
                </button>
              </form>
            </MotionCard>

            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold tracking-tight">
                  Postime ekzistuese
                </h2>
                <div className="text-xs text-muted-foreground">
                  {posts.length} postime në total
                </div>
              </div>

              {posts.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Ende nuk ka postime në bazën e të dhënave.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-border/70 bg-background p-4"
                    >
                      <form action={updateAcademyPost}>
                        <input type="hidden" name="id" value={post.id} />

                        <div className="grid gap-2">
                          <Field label="Titulli">
                            <input
                              name="title"
                              defaultValue={post.title}
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Slug">
                            <input
                              name="slug"
                              defaultValue={post.slug}
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Foto">
                            <input
                              name="coverImage"
                              defaultValue={post.coverImage ?? ""}
                              placeholder="/academy.jpg"
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Data e publikimit">
                            <input
                              type="datetime-local"
                              name="publishedAt"
                              defaultValue={formatDateTimeForInput(post.publishedAt)}
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Përmbledhje">
                            <textarea
                              name="excerpt"
                              defaultValue={post.excerpt ?? ""}
                              rows={2}
                              className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Përmbajtja">
                            <textarea
                              name="content"
                              defaultValue={post.content}
                              rows={5}
                              className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <label className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                            <input
                              type="checkbox"
                              name="isActive"
                              defaultChecked={post.isActive}
                              className="h-3 w-3 rounded border-border/70 bg-background"
                            />
                            <span>Aktiv</span>
                          </label>

                          <button
                            type="submit"
                            className="inline-flex h-8 items-center justify-center rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90"
                          >
                            Ruaj ndryshimet
                          </button>
                        </div>
                      </form>

                      <form action={deleteAcademyPost} className="mt-2 inline-flex">
                        <input type="hidden" name="id" value={post.id} />
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