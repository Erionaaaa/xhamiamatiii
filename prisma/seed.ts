import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mosqueInfo.deleteMany();
  // Mos i fshi kategoritë e videove: fshirja e tyre fshin edhe videot (Cascade).
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
  // Video demonstruese: shtohen vetëm në instalimin e parë (kur nuk ka video).
  const hasAnyVideo = (await prisma.video.count()) > 0;
  if (!hasAnyVideo) {
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
  }

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
        title: "Aksion humanitar: pako ushqimore për familjet në nevojë",
        slug: "aksion-humanitar-pako-ushqimore",
        coverImage: "/activities.jpg",
        summary:
          "Grumbullim dhe shpërndarje e pakove ushqimore e higjienike për familjet me vështirësi ekonomike në Prishtinë.",
        content:
          "Aksioni zhvillohet në bashkëpunim me vullnetarët e xhamisë dhe donatorët lokalë. Pranohen donacione në ushqime bazike dhe produkte higjienike. Shpërndarja bëhet me listë të verifikuar për familjet në nevojë.",
        startsAt: new Date("2026-03-23T16:30:00+01:00"),
        endsAt: new Date("2026-03-23T19:30:00+01:00"),
        isActive: true,
      },
      {
        title: "Mbrëmje rinore: pyetje & përgjigje pas jacisë",
        slug: "mbremje-rinore-pyetje-pergjigje-jacise",
        coverImage: "/youth.jpg",
        summary:
          "Takim i hapur me të rinjtë me diskutim praktik mbi sfidat e përditshme, shkollën dhe rrjetet sociale.",
        content:
          "Programi nis pas namazit të jacisë me një ligjëratë të shkurtër, pastaj vazhdon me pyetje anonime dhe diskutim të lirë. Aktiviteti synon afrim, mbështetje dhe këshillim për të rinjtë e lagjes.",
        startsAt: new Date("2026-03-27T20:15:00+01:00"),
        endsAt: new Date("2026-03-27T21:45:00+01:00"),
        isActive: true,
      },
      {
        title: "Ligjëratë mujore për prindërit dhe familjen",
        slug: "ligjerate-mujore-prinderit-dhe-familja",
        coverImage: "/inside.jpg",
        summary:
          "Ligjëratë me fokus komunikimin në familje, edukimin e fëmijëve dhe ruajtjen e harmonisë në shtëpi.",
        content:
          "Ligjërata mbahet nga imamët e xhamisë dhe mysafirë të ftuar. Pas ligjëratës zhvillohet sesion i shkurtër pyetje-përgjigje me tema praktike për prindërit.",
        startsAt: new Date("2026-04-04T19:00:00+02:00"),
        endsAt: new Date("2026-04-04T20:30:00+02:00"),
        isActive: true,
      },
      {
        title: "Kurs bazik: lexim i Kur’anit për fillestarë",
        slug: "kurs-bazik-lexim-kuranit-fillestare",
        coverImage: "/academy.jpg",
        summary:
          "Terminë javore për fillestarë me mësim të shkronjave arabe, shqiptim bazik dhe ushtrime praktike.",
        content:
          "Kursi është i hapur për të gjitha moshat. Oraret organizohen në grupe të vogla për të siguruar përkushtim individual dhe përparim gradual.",
        startsAt: new Date("2026-04-06T18:00:00+02:00"),
        endsAt: new Date("2026-04-06T19:15:00+02:00"),
        isActive: true,
      },
      {
        title: "Vizitë solidariteti për të moshuarit e lagjes",
        slug: "vizite-solidariteti-te-moshuarit",
        coverImage: "/xhamia.jpg",
        summary:
          "Vizita periodike me ndihmë praktike dhe mbështetje morale për të moshuarit që jetojnë vetëm.",
        content:
          "Vullnetarët koordinojnë vizitat në grupe të vogla, duke sjellë pako bazike dhe duke ndihmuar në nevoja të përditshme. Qëllimi është afrimi i komunitetit dhe kujdesi për të moshuarit.",
        startsAt: new Date("2026-04-10T11:00:00+02:00"),
        endsAt: new Date("2026-04-10T13:00:00+02:00"),
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

