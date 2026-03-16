import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mosqueInfo.deleteMany();
  await prisma.video.deleteMany();
  await prisma.videoCategory.deleteMany();
  await prisma.academyPost.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.donationMethod.deleteMany();

  await prisma.mosqueInfo.create({
    data: {
      name: "Xhamia Mati 1",
      city: "Prishtinë",
      address: "Prishtinë, Kosovë",
      description:
        "Mirë se vini në faqen zyrtare të Xhamisë Mati 1. Këtu gjeni informacion, oraret e namazit, video sipas tematikave, Akademinë, aktivitetet dhe mënyrat e donacionit.",
    },
  });

  const ligjerata = await prisma.videoCategory.upsert({
    where: { slug: "ligjerata" },
    update: { name: "Ligjërata", order: 1, isActive: true },
    create: { name: "Ligjërata", slug: "ligjerata", order: 1, isActive: true },
  });
  await prisma.videoCategory.upsert({
    where: { slug: "hytbe" },
    update: { name: "Hytbe", order: 2, isActive: true },
    create: { name: "Hytbe", slug: "hytbe", order: 2, isActive: true },
  });
  await prisma.videoCategory.upsert({
    where: { slug: "kuran" },
    update: { name: "Kur’an", order: 3, isActive: true },
    create: { name: "Kur’an", slug: "kuran", order: 3, isActive: true },
  });
  await prisma.videoCategory.upsert({
    where: { slug: "familja-edukimi" },
    update: { name: "Familja & Edukimi", order: 4, isActive: true },
    create: {
      name: "Familja & Edukimi",
      slug: "familja-edukimi",
      order: 4,
      isActive: true,
    },
  });
  // Video demonstruese (ndryshoji URL-t sipas dëshirës)
  await prisma.video.createMany({
    data: [
      {
        title: "Rëndësia e namazit në jetën e përditshme",
        slug: "rendesia-e-namazit",
        youtubeUrl: "https://www.youtube.com/watch?v=-vVMEinu9v4",
        description:
          "Ligjëratë motivuese rreth namazit dhe ndikimit të tij në moral dhe disiplinë.",
        categoryId: ligjerata.id,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Rinia dhe përgjegjësia në Islam",
        slug: "rinia-dhe-pergjegjesia",
        youtubeUrl: "https://www.youtube.com/watch?v=6nH0Vn_6P3U",
        description:
          "Mesazh i veçantë për të rinjtë: si ta shfrytëzojnë kohën dhe energjinë në mënyrë të dobishme.",
        categoryId: ligjerata.id,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Dashuria ndaj Kur’anit në familje",
        slug: "dashuria-ndaj-kuranit-ne-familje",
        youtubeUrl: "https://www.youtube.com/watch?v=WL6SZmkMBVE",
        description:
          "Si të krijojmë atmosferë familjare rreth leximit dhe kuptimit të Kur’anit.",
        categoryId: ligjerata.id,
        isActive: true,
      },
    ],
  });

  await prisma.academyPost.createMany({
    data: [
      {
        title: "Programi i Akademisë për fëmijë",
        slug: "programi-i-akademise-per-femije",
        excerpt:
          "Mësime të Kur’anit, akides dhe ahlakut për fëmijë, në grupe të ndara sipas moshës.",
        content:
          "Ky është një tekst demonstrues për përmbajtjen e Akademisë. Këtu mund të shpjegohet struktura e niveleve, orari, kushtet e regjistrimit dhe metoda e punës me fëmijët.\n\nMë vonë mund ta zëvendësosh me tekstin real, pa pasur nevojë të ndryshosh kodin.",
        isActive: true,
      },
      {
        title: "Kurs për lexim të Kur’anit për të rritur",
        slug: "kurs-per-lexim-te-kuranit-per-te-rritur",
        excerpt:
          "Grup i veçantë për ata që duan të mësojnë leximin korrekt të Kur’anit nga bazat.",
        content:
          "Shembull për një artikull tjetër të Akademisë. Mund të shtohen detaje për mësuesit, kohëzgjatjen e kursit, materialet e përdorura, etj.",
        isActive: true,
      },
    ],
  });

  await prisma.activity.createMany({
    data: [
      {
        title: "Aksion humanitar për familjet në nevojë",
        slug: "aksion-humanitar-familjet-ne-nevoje",
        summary:
          "Mbledhje ushqimore dhe higjienike për familjet me gjendje të rënduar ekonomike në lagjen Mati 1.",
        content:
          "Përshkrim demonstrues i një aksioni humanitar. Këtu mund të shkruhen kriteret, mënyra e shpërndarjes dhe raportimi pas aksionit.",
        isActive: true,
      },
      {
        title: "Mbrëmje rinore me temë: Identiteti islam",
        slug: "mbremje-rinore-identiteti-islam",
        summary:
          "Takim i veçantë me të rinjtë, me ligjëratë, pyetje & përgjigje dhe shoqërim.",
        content:
          "Tekst demonstrues për një aktivitet rinor. Mund të specifikohen data, mysafirët, programi i mbrëmjes dhe fotot shoqëruese.",
        isActive: true,
      },
    ],
  });

  await prisma.donationMethod.createMany({
    data: [
      {
        title: "Donacion me bankë",
        description:
          "Shembull: Llogaria e xhamisë për donacione të përgjithshme. Zëvendëso tekstin me të dhënat reale.",
        bankName: "Shembull Bank",
        accountName: "Xhamia Mati 1",
        iban: "XX00 0000 0000 0000 000",
        swift: "SHEMBULLXX",
        order: 1,
      },
      {
        title: "Donacion online",
        description:
          "Shembull linku për pagesë online (PayPal / Stripe / tjetër).",
        linkUrl: "https://example.com/donate",
        order: 2,
      },
      {
        title: "Kontakt direkt",
        description:
          "Për donacione specifike ose pyetje, kontakto në numrin e mëposhtëm.",
        phone: "+383 44 000 000",
        order: 3,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

