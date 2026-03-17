import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    body = await req.json();
  } else {
    const fd = await req.formData();
    body = Object.fromEntries(
      [...fd.entries()].map(([k, v]) => [k, String(v)])
    );
  }

  const name    = (body.name    ?? "").trim();
  const email   = (body.email   ?? "").trim();
  const phone   = (body.phone   ?? "").trim();
  const message = (body.message ?? "").trim();
  const context = (body.context ?? "kontakt").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Ju lutem plotesoni emrin, emailin dhe mesazhin." },
      { status: 400 }
    );
  }

  const info = await prisma.mosqueInfo.findFirst();
  const adminEmail = process.env.CONTACT_EMAIL ?? info?.email ?? "info@xhamia.com";
  const adminPhone = info?.phone ?? process.env.CONTACT_PHONE ?? "-";

  const lines = [
    "Mesazh i ri nga faqja - " + context,
    "=".repeat(44),
    "",
    "Emri:     " + name,
    "Email:    " + email,
    phone ? "Telefoni: " + phone : null,
    "",
    "Mesazhi:",
    message,
    "",
    "-".repeat(44),
    "Nr. kontakti i xhamise: " + adminPhone,
  ].filter((l) => l !== null).join("\n");

  const htmlBody = [
    '<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">',
    '<h2 style="margin-bottom:4px;font-size:18px">Mesazh i ri nga faqja</h2>',
    '<p style="color:#666;font-size:13px;margin-top:0">Konteksti: <strong>' + context + '</strong></p>',
    '<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>',
    '<table style="font-size:14px;width:100%;border-collapse:collapse">',
    '<tr><td style="padding:6px 8px;color:#555;width:110px">Emri</td><td style="padding:6px 8px;font-weight:600">' + name + '</td></tr>',
    '<tr style="background:#f9f9f9"><td style="padding:6px 8px;color:#555">Email</td><td style="padding:6px 8px"><a href="mailto:' + email + '">' + email + '</a></td></tr>',
    phone ? '<tr><td style="padding:6px 8px;color:#555">Telefoni</td><td style="padding:6px 8px">' + phone + '</td></tr>' : '',
    '</table>',
    '<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>',
    '<h3 style="font-size:14px;margin-bottom:8px">Mesazhi:</h3>',
    '<p style="font-size:14px;line-height:1.7;background:#f5f5f5;padding:12px 16px;border-radius:8px;white-space:pre-wrap">' + message + '</p>',
    '<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>',
    '<p style="font-size:12px;color:#999">Nr. kontakti i xhamise: ' + adminPhone + '</p>',
    '</div>',
  ].join("\n");

  const transporter = createTransport();

  if (!transporter) {
    console.log("[contact] DEMO - nuk ka SMTP:\n", lines);
    return NextResponse.json({ ok: true, demo: true });
  }

  const from = process.env.SMTP_FROM ?? adminEmail;

  await transporter.sendMail({
    to: adminEmail,
    from,
    replyTo: email,
    subject: "[Xhamia Mati 1] Mesazh nga " + name,
    text: lines,
    html: htmlBody,
  });

  return NextResponse.json({ ok: true });
}
