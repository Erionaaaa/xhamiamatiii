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

async function ensureUniqueActivitySlug(base: string, excludeId?: string) {
  const cleanBase = slugify(base);
  if (!cleanBase) return `aktivitet-${Date.now()}`;

  let candidate = cleanBase;
  let i = 2;

  while (i < 100) {
    const existing = await prisma.activity.findFirst({
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

async function createActivity(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const startsAtRaw = String(formData.get("startsAt") ?? "").trim();
  const endsAtRaw = String(formData.get("endsAt") ?? "").trim();
  const isActive = formData.get("isActive") !== "off";

  if (!title) {
    redirect("/admin/aktivitete");
  }

  const slug = await ensureUniqueActivitySlug(slugRaw || title);

  await prisma.activity.create({
    data: {
      title,
      slug,
      summary: summary || null,
      content: content || null,
      coverImage: coverImage || null,
      startsAt: parseDateTimeInput(startsAtRaw),
      endsAt: parseDateTimeInput(endsAtRaw),
      isActive,
    },
  });

  revalidatePath("/admin/aktivitete");
  revalidatePath("/aktivitete");
  redirect("/admin/aktivitete");
}

async function updateActivity(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const startsAtRaw = String(formData.get("startsAt") ?? "").trim();
  const endsAtRaw = String(formData.get("endsAt") ?? "").trim();
  const isActive = formData.get("isActive") !== "off";

  if (!id) {
    redirect("/admin/aktivitete");
  }

  const baseSlug = slugRaw || title;
  const slug = baseSlug ? await ensureUniqueActivitySlug(baseSlug, id) : "";

  await prisma.activity.update({
    where: { id },
    data: {
      ...(title ? { title } : {}),
      ...(slug ? { slug } : {}),
      summary: summary || null,
      content: content || null,
      coverImage: coverImage || null,
      startsAt: parseDateTimeInput(startsAtRaw),
      endsAt: parseDateTimeInput(endsAtRaw),
      isActive,
    },
  });

  revalidatePath("/admin/aktivitete");
  revalidatePath("/aktivitete");
  redirect("/admin/aktivitete");
}

async function deleteActivity(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin/aktivitete");
  }

  await prisma.activity.delete({ where: { id } });

  revalidatePath("/admin/aktivitete");
  revalidatePath("/aktivitete");
  redirect("/admin/aktivitete");
}

export default async function AdminActivitiesPage() {
  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const activities = await prisma.activity.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Menaxhimi i aktiviteteve
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Këtu mund të shtosh aktivitete të reja dhe të ndryshosh fotot e
                aktiviteteve ekzistuese pa prekur kodin.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <h2 className="text-base font-semibold tracking-tight">
                Shto aktivitet të ri
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Te Foto, përdor path nga public p.sh. /youth.jpg ose /activities.jpg
              </p>

              <form action={createActivity} className="mt-4 grid gap-3">
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
                    placeholder="p.sh. aksion-humanitar-mati-1"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Foto (opsionale)">
                  <input
                    name="coverImage"
                    placeholder="/activities.jpg"
                    className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Përmbledhje (opsionale)">
                  <textarea
                    name="summary"
                    rows={2}
                    className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <Field label="Përmbajtja (opsionale)">
                  <textarea
                    name="content"
                    rows={4}
                    className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  />
                </Field>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Fillimi (opsionale)">
                    <input
                      type="datetime-local"
                      name="startsAt"
                      className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                    />
                  </Field>
                  <Field label="Mbarimi (opsionale)">
                    <input
                      type="datetime-local"
                      name="endsAt"
                      className="h-9 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                    />
                  </Field>
                </div>

                <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked
                    className="h-3 w-3 rounded border-border/70 bg-background"
                  />
                  <span>Aktivitet aktiv (shfaqet në faqe)</span>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Shto aktivitetin
                </button>
              </form>
            </MotionCard>

            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold tracking-tight">
                  Aktivitete ekzistuese
                </h2>
                <div className="text-xs text-muted-foreground">
                  {activities.length} aktivitete në total
                </div>
              </div>

              {activities.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Ende nuk ka aktivitete në bazën e të dhënave.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {activities.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-2xl border border-border/70 bg-background p-4"
                    >
                      <form action={updateActivity}>
                        <input type="hidden" name="id" value={a.id} />

                        <div className="grid gap-2">
                          <Field label="Titulli">
                            <input
                              name="title"
                              defaultValue={a.title}
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Slug">
                            <input
                              name="slug"
                              defaultValue={a.slug}
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Foto">
                            <input
                              name="coverImage"
                              defaultValue={a.coverImage ?? ""}
                              placeholder="/activities.jpg"
                              className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <Field label="Fillimi">
                              <input
                                type="datetime-local"
                                name="startsAt"
                                defaultValue={formatDateTimeForInput(a.startsAt)}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              />
                            </Field>
                            <Field label="Mbarimi">
                              <input
                                type="datetime-local"
                                name="endsAt"
                                defaultValue={formatDateTimeForInput(a.endsAt)}
                                className="h-8 w-full rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                              />
                            </Field>
                          </div>

                          <Field label="Përmbledhje">
                            <textarea
                              name="summary"
                              defaultValue={a.summary ?? ""}
                              rows={2}
                              className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>

                          <Field label="Përmbajtja">
                            <textarea
                              name="content"
                              defaultValue={a.content ?? ""}
                              rows={3}
                              className="w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                            />
                          </Field>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <label className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                            <input
                              type="checkbox"
                              name="isActive"
                              defaultChecked={a.isActive}
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

                      <form action={deleteActivity} className="mt-2 inline-flex">
                        <input type="hidden" name="id" value={a.id} />
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
