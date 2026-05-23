export type Package = "all" | "economy" | "business" | "first";
export type Region  = "europe" | "americas" | "asia" | "africa" | "oceania";

export interface Destination {
  city: string;
  country: string;
  region: Region;
  packages: Package[];
  duration: string;
  price: number;
  tag?: string;
  description?: string;
  featured?: boolean;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  { city: "Paris",        country: "França",        region: "europe",   packages: ["economy","business","first"], duration: "10h", price: 2800, tag: "Mais Popular", featured: true,  description: "Arte, gastronomia e a Torre Eiffel iluminada.",   image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { city: "Tóquio",       country: "Japão",         region: "asia",     packages: ["economy","business","first"], duration: "24h", price: 5200, tag: "Novo",          featured: true,  description: "Tradição milenar e futurismo lado a lado.",       image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { city: "Nova York",    country: "EUA",           region: "americas", packages: ["economy","business","first"], duration: "9h",  price: 3400,                       featured: true,  description: "A cidade que nunca dorme.",                       image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
  { city: "Dubai",        country: "Emirados",      region: "asia",     packages: ["business","first"],           duration: "14h", price: 6800, tag: "Luxo",                           description: "Luxo no deserto.",                                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { city: "Sydney",       country: "Austrália",     region: "oceania",  packages: ["economy","business","first"], duration: "27h", price: 6200,                                        description: "Opera House e Bondi Beach.",                      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80" },
  { city: "Cape Town",    country: "África do Sul", region: "africa",   packages: ["economy","business","first"], duration: "16h", price: 4400, tag: "Novo",                           description: "Table Mountain e vinhedos.",                      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80" },
  { city: "Roma",         country: "Itália",        region: "europe",   packages: ["economy","business"],         duration: "11h", price: 2400,                                        description: "Coliseu e gelato autêntico.",                     image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80" },
  { city: "Bangkok",      country: "Tailândia",     region: "asia",     packages: ["economy","business"],         duration: "22h", price: 4100,                                        description: "Templos dourados e street food.",                 image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80" },
  { city: "Miami",        country: "EUA",           region: "americas", packages: ["economy","business"],         duration: "8h",  price: 2900,                                        description: "Praias, art déco e vida noturna.",                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { city: "Lisboa",       country: "Portugal",      region: "europe",   packages: ["economy"],                    duration: "9h",  price: 1900,                                        description: "Fados, pastéis e o Tejo.",                        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
  { city: "Buenos Aires", country: "Argentina",     region: "americas", packages: ["economy"],                    duration: "3h",  price: 1100,                                        description: "Tango e parrilla.",                               image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80" },
  { city: "Cingapura",    country: "Singapura",     region: "asia",     packages: ["economy","business","first"], duration: "23h", price: 4700,                                        description: "Marina Bay e Gardens by the Bay.",                image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80" },
  { city: "Amsterdã",     country: "Holanda",       region: "europe",   packages: ["economy","business"],         duration: "12h", price: 2600,                                        description: "Canais, museus e tulipas.",                       image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" },
  { city: "Istambul",     country: "Turquia",       region: "europe",   packages: ["economy","business","first"], duration: "13h", price: 3100, tag: "Novo",                           description: "Entre Europa e Ásia, Hagia Sophia e o Bósforo.",  image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" },
  { city: "Marrakech",    country: "Marrocos",      region: "africa",   packages: ["economy","business"],         duration: "11h", price: 2200,                                        description: "Souks, riad e o deserto do Saara.",               image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80" },
  { city: "Bali",         country: "Indonésia",     region: "asia",     packages: ["economy","business"],         duration: "26h", price: 4300,                                        description: "Templos, arrozais e praias de tirar o fôlego.",   image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
  { city: "Cancún",       country: "México",        region: "americas", packages: ["economy","business"],         duration: "7h",  price: 2100,                                        description: "Caribe turquesa, ruínas maias e cenotes.",        image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&q=80" },
  { city: "Praga",        country: "Rep. Tcheca",   region: "europe",   packages: ["economy"],                    duration: "13h", price: 2300,                                        description: "Cidade medieval, pontes históricas e cerveja.",   image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80" },
  { city: "Nairobi",      country: "Quênia",        region: "africa",   packages: ["economy","business"],         duration: "14h", price: 3800, tag: "Novo",                           description: "Safari no Masai Mara e vida selvagem única.",     image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80" },
  { city: "Vancouver",    country: "Canadá",        region: "americas", packages: ["economy","business","first"], duration: "11h", price: 3600,                                        description: "Montanhas, oceano e a cidade mais verde do mundo.",image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80" },
  { city: "Seul",         country: "Coreia do Sul", region: "asia",     packages: ["economy","business","first"], duration: "22h", price: 4900, tag: "Novo",                           description: "K-pop, gastronomia e templos milenares.",         image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80" },
  { city: "Barcelona",    country: "Espanha",       region: "europe",   packages: ["economy","business"],         duration: "11h", price: 2500,                                        description: "Gaudí, praias e a vibrante vida noturna.",        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80" },
  { city: "Montevidéu",   country: "Uruguai",       region: "americas", packages: ["economy"],                    duration: "3h",  price: 980,                                         description: "Rambla, charme colonial e o melhor churrasco.",   image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&q=80" },
  { city: "Auckland",     country: "Nova Zelândia", region: "oceania",  packages: ["economy","business"],         duration: "29h", price: 6800,                                        description: "Hobbiton, fiordes e natureza selvagem.",          image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80" },
  { city: "Cairo",        country: "Egito",         region: "africa",   packages: ["economy","business"],         duration: "12h", price: 2700, tag: "Novo",                           description: "Pirâmides de Gizé e o Rio Nilo.",                 image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80" },
  { city: "Zanzibar",     country: "Tanzânia",      region: "africa",   packages: ["economy","business"],         duration: "16h", price: 4100,                                        description: "Praias brancas, especiarias e cultura swahili.",  image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80" },
  { city: "Lagos",        country: "Nigéria",       region: "africa",   packages: ["economy"],                    duration: "10h", price: 2900,                                        description: "A maior metrópole africana, vibrante e diversa.", image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800&q=80" },
  { city: "Melbourne",    country: "Austrália",     region: "oceania",  packages: ["economy","business","first"], duration: "27h", price: 6400,                                        description: "Café, arte de rua e o Grand Prix.",               image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80" },
  { city: "Fiji",         country: "Fiji",          region: "oceania",  packages: ["economy","business"],         duration: "22h", price: 5900, tag: "Luxo",                           description: "Ilhas de coral, lagoas cristalinas e resorts.",   image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80" },
  { city: "Queenstown",   country: "Nova Zelândia", region: "oceania",  packages: ["economy","business"],         duration: "30h", price: 7100,                                        description: "Capital mundial dos esportes radicais.",          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { city: "Papeete",      country: "Polinésia Fr.", region: "oceania",  packages: ["business","first"],           duration: "25h", price: 8200, tag: "Luxo",                           description: "Bungalôs sobre a água e lagoas turquesa.",        image: "https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=800&q=80" },
];

export const REGIONS: { key: Region | "all"; label: string }[] = [
  { key: "all",      label: "Todos"    },
  { key: "europe",   label: "Europa"   },
  { key: "americas", label: "Américas" },
  { key: "asia",     label: "Ásia"     },
  { key: "africa",   label: "África"   },
  { key: "oceania",  label: "Oceania"  },
];

export const PACKAGES: { key: Package | "all"; label: string }[] = [
  { key: "all",      label: "Todos os Pacotes" },
  { key: "economy",  label: "Economy"          },
  { key: "business", label: "Business"         },
  { key: "first",    label: "Primeira Classe"  },
];

export const REGION_BG: Record<Region, string> = {
  europe:   "#E3F0FC",
  americas: "#E6F4E5",
  asia:     "#FFF5CC",
  africa:   "#FEF0E0",
  oceania:  "#E3F0FC",
};

export const REGION_ACCENT: Record<Region, string> = {
  europe:   "#2D7BC4",
  americas: "#3BAA35",
  asia:     "#E6A800",
  africa:   "#D4760A",
  oceania:  "#0B2E5E",
};

export const PKG_LABEL: Record<Package, string> = {
  all: "", economy: "Economy", business: "Business", first: "1ª Classe",
};

export const PAYMENT_METHODS = [
  { label: "Visa",       maxInstallments: 12 },
  { label: "Mastercard", maxInstallments: 12 },
  { label: "Elo",        maxInstallments: 10 },
  { label: "Amex",       maxInstallments: 6  },
  { label: "Pix",        maxInstallments: 1  },
];

export const INSTALLMENT_OPTIONS = [1, 2, 3, 6, 10, 12];

export const HIGHLIGHTS: Record<Region, { icon: string; label: string }[]> = {
  europe:   [{ icon: "🏛️", label: "Patrimônio histórico" }, { icon: "🍷", label: "Gastronomia" },   { icon: "🚆", label: "Trens regionais" }],
  americas: [{ icon: "🌊", label: "Praias" },               { icon: "🎶", label: "Cultura local" }, { icon: "🌿", label: "Natureza" }],
  asia:     [{ icon: "🏯", label: "Templos" },              { icon: "🍜", label: "Street food" },    { icon: "🛕", label: "Espiritualidade" }],
  africa:   [{ icon: "🦁", label: "Safari" },               { icon: "🌅", label: "Paisagens" },      { icon: "🥁", label: "Cultura tribal" }],
  oceania:  [{ icon: "🤿", label: "Mergulho" },             { icon: "🏄", label: "Surf" },           { icon: "🌺", label: "Natureza exótica" }],
};
