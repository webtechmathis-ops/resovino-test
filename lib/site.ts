export const site = {
  name: "ResoVino",
  tagline: "Le vin, sans chichi",
  description:
    "Guides, régions, cépages et accords mets-vins. ResoVino vous aide à comprendre, choisir et déguster le vin avec clarté.",
  url: "https://resovino.fr",
  locale: "fr_FR",
  twitter: "@resovino",
  author: "L'équipe ResoVino",
} as const;

export type CategorySlug =
  | "guide-debutant"
  | "regions"
  | "cepages"
  | "accords"
  | "grands-crus"
  | "vins-du-monde";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "guide-debutant",
    name: "Guide du débutant",
    short: "Débuter",
    description: "Bases de l'œnologie, types de vin, dégustation, achat.",
  },
  {
    slug: "regions",
    name: "Régions",
    short: "Régions",
    description: "Bordeaux, Bourgogne, Champagne, Rhône, Loire, Alsace…",
  },
  {
    slug: "cepages",
    name: "Cépages",
    short: "Cépages",
    description: "Cabernet, Merlot, Pinot Noir, Chardonnay, Syrah, Riesling…",
  },
  {
    slug: "accords",
    name: "Accords mets-vins",
    short: "Accords",
    description: "Fromages, viandes, poissons, desserts, cuisines du monde.",
  },
  {
    slug: "grands-crus",
    name: "Grands crus",
    short: "Grands crus",
    description: "Châteaux, domaines, maisons et classements.",
  },
  {
    slug: "vins-du-monde",
    name: "Vins du monde",
    short: "Monde",
    description: "Italie, Espagne, Argentine, Chili, USA, vins natures…",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
