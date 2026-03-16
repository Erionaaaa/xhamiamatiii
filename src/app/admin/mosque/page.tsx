import { redirect } from "next/navigation";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { prisma } from "@/lib/prisma";
import { isAdminLoggedInAsync } from "@/lib/admin-auth";

async function updateMosque(formData: FormData) {
  "use server";

  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const name = String(formData.get("name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const existing = await prisma.mosqueInfo.findFirst();
  if (existing) {
    await prisma.mosqueInfo.update({
      where: { id: existing.id },
      data: { name, city, address, phone, email, description },
    });
  } else {
    await prisma.mosqueInfo.create({
      data: { name, city, address, phone, email, description },
    });
  }

  redirect("/admin");
}

export default async function AdminMosquePage() {
  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const info = await prisma.mosqueInfo.findFirst();

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <h1 className="text-3xl font-semibold tracking-tight">
            Info për xhaminë
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Këto të dhëna përdoren në ballinë, faqen “Xhamia”, kontakt dhe footer.
          </p>

          <MotionCard className="mt-8 max-w-2xl rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
            <form action={updateMosque} className="grid gap-4 text-sm">
              <Field label="Emri i xhamisë">
                <input
                  name="name"
                  defaultValue={info?.name ?? "Xhamia Mati 1"}
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>
              <Field label="Qyteti">
                <input
                  name="city"
                  defaultValue={info?.city ?? "Prishtinë"}
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>
              <Field label="Adresa">
                <input
                  name="address"
                  defaultValue={info?.address ?? ""}
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>
              <Field label="Telefoni">
                <input
                  name="phone"
                  defaultValue={info?.phone ?? ""}
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  defaultValue={info?.email ?? ""}
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>
              <Field label="Përshkrimi (shfaqet në ballinë / Xhamia)">
                <textarea
                  name="description"
                  defaultValue={
                    info?.description ??
                    "Mirë se vini në faqen zyrtare të Xhamisë Mati 1."
                  }
                  className="min-h-[120px] w-full rounded-2xl border border-border/70 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/40"
                />
              </Field>

              <button
                type="submit"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Ruaj ndryshimet
              </button>
            </form>
          </MotionCard>
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

