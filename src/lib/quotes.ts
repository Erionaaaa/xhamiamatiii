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
];

