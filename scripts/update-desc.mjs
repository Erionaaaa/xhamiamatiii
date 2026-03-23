import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const r = await prisma.mosqueInfo.findFirst();
if (r) {
  await prisma.mosqueInfo.update({
    where: { id: r.id },
    data: { description: "Xhamia Mati 1 \u2014 qend\u00ebr shpirt\u00ebrore e komunitetit. Oraret e namazit, ligj\u00ebratat, Akademia dhe aktivitetet n\u00eb nj\u00eb vend." },
  });
  console.log("U azh\u00fbrua me sukses!");
} else {
  console.log("Nuk u gjet asnje rekord.");
}
await prisma.$disconnect();
