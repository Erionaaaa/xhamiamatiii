export type Quote = {
  kind: "Ajet" | "Hadith" | "Dua";
  ar: string;
  sq: string;
  ref: string;
};

export const QUOTES: Quote[] = [
  {
    kind: "Ajet",
    ar: "إِنَّ ٱلصَّلَوٰةَ تَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ",
    sq: "“Me të vërtetë, namazi të largon nga të këqijat dhe të shëmtuarat.”",
    ref: "El‑Ankebut 29:45",
  },
  {
    kind: "Ajet",
    ar: "ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ",
    sq: "“Më lutuni Mua, Unë do t’ju përgjigjem.”",
    ref: "Gafir 40:60",
  },
  {
    kind: "Ajet",
    ar: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    sq: "“Me vështirësinë vjen lehtësimi.”",
    ref: "Esh‑Sherh 94:6",
  },
  {
    kind: "Ajet",
    ar: "فَٱذْكُرُونِيٓ أَذْكُرْكُمْ",
    sq: "“Më përkujtoni Mua, Unë do t’ju përkujtoj.”",
    ref: "El‑Bekare 2:152",
  },
  {
    kind: "Ajet",
    ar: "وَمَا تَوْفِيقِيٓ إِلَّا بِٱللَّهِ",
    sq: "“Suksesi im është vetëm me Allahun.”",
    ref: "Hud 11:88",
  },
  {
    kind: "Ajet",
    ar: "وَٱصْبِرْ وَمَا صَبْرُكَ إِلَّا بِٱللَّهِ",
    sq: "“Bëhu i durueshëm, e durimi yt është vetëm me Allahun.”",
    ref: "En‑Nahl 16:127",
  },
  {
    kind: "Hadith",
    ar: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    sq: "“Më i miri prej njerëzve është ai që u sjell më shumë dobi njerëzve.”",
    ref: "Hadith (i njohur)",
  },
  {
    kind: "Hadith",
    ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    sq: "“Veprat vlejnë sipas qëllimeve.”",
    ref: "Buhari & Muslim",
  },
  {
    kind: "Hadith",
    ar: "الدِّينُ النَّصِيحَةُ",
    sq: "“Feja është këshillë (sinqeritet).”",
    ref: "Muslim (përmbledhje)",
  },
  {
    kind: "Dua",
    ar: "رَبِّ ٱشْرَحْ لِى صَدْرِى وَيَسِّرْ لِىٓ أَمْرِى",
    sq: "“O Zoti im, ma zgjero gjoksin dhe ma lehtëso punën.”",
    ref: "Taha 20:25–26 (dua)",
  },
  {
    kind: "Ajet",
    ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    sq: "“Vërtet, me përmendjen e Allahut qetësohen zemrat.”",
    ref: "Er‑Ra'd 13:28",
  },
  {
    kind: "Ajet",
    ar: "وَقُل رَّبِّ زِدْنِى عِلْمًا",
    sq: "“Dhe thuaj: O Zoti im, ma shto diturinë.”",
    ref: "Taha 20:114",
  },
  {
    kind: "Ajet",
    ar: "وَلَا تَيْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ",
    sq: "E mos e humbni shpresën nga mëshira e Allahut.",
    ref: "Jusuf 12:87",
  },
  {
    kind: "Ajet",
    ar: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
    sq: "Na mjafton Allahu dhe sa i mrekullueshëm është Ai si Mbikëqyrës.",
    ref: "Al Imran 3:173",
  },
  {
    kind: "Ajet",
    ar: "يُرِيدُ ٱللَّهُ بِكُمُ ٱلْيُسْرَ وَلَا يُرِيدُ بِكُمُ ٱلْعُسْرَ",
    sq: "Allahu dëshiron për ju lehtësi, e nuk dëshiron vështirësi.",
    ref: "El-Bekare 2:185",
  },
  {
    kind: "Ajet",
    ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    sq: "Dhe Ai është me ju kudo që të jeni.",
    ref: "El-Hadid 57:4",
  },
  {
    kind: "Hadith",
    ar: "مَنْ صَمَتَ نَجَا",
    sq: "Kush heshtë, shpëton.",
    ref: "Tirmidhi",
  },
  {
    kind: "Hadith",
    ar: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    sq: "Musliman i vërtetë është ai nga gjuha dhe dora e të cilit janë të sigurt muslimanët e tjerë.",
    ref: "Buhari",
  },
  {
    kind: "Hadith",
    ar: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    sq: "Buzëqeshja jote ndaj vëllait tënd është sadaka.",
    ref: "Tirmidhi",
  },
  {
    kind: "Dua",
    ar: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً وَفِى ٱلْـَٔاخِرَةِ حَسَنَةً",
    sq: "O Zoti ynë, na jep të mira në këtë botë dhe në botën tjetër.",
    ref: "El-Bekare 2:201 (dua)",
  },
  {
    kind: "Dua",
    ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    sq: "O Zoti ynë, mos na i lak zemrat tona pasi na ke udhëzuar.",
    ref: "Al Imran 3:8 (dua)",
  },
];

