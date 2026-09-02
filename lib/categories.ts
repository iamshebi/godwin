export const CATEGORY_SLUGS = [
  "automotive",
  "brand",
  "events",
  "fashion-films",
  "food",
  "interior",
  "photos",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  automotive: "AUTOMOTIVE",
  brand: "BRAND",
  events: "EVENTS",
  "fashion-films": "FASHION FILMS",
  food: "FOOD",
  interior: "INTERIOR",
  photos: "PHOTOS",
};

export const CATEGORY_SIDE_LABELS: Record<CategorySlug, string> = {
  automotive: "Cars & Motion",
  brand: "Brand & Commercial",
  events: "Events & Corporate",
  "fashion-films": "Fashion Film",
  food: "Food & Beverage",
  interior: "Interior & Architecture",
  photos: "Photography",
};

type CategorySeo = { title: string; description: string };

export const CATEGORY_SEO: Record<CategorySlug, CategorySeo> = {
  automotive: {
    title: "Automotive Photography & Film in Dubai",
    description:
      "Automotive photography and film production by Inspire Media in Dubai, UAE.",
  },
  brand: {
    title: "Brand & Commercial Production in Dubai",
    description:
      "Brand films and commercial photography by Inspire Media for companies across Dubai and the UAE.",
  },
  events: {
    title: "Event & Corporate Film Production in Dubai",
    description:
      "Corporate event films and event photography by Inspire Media in Dubai, UAE, for clients including ARAMEX, Canon, Givenchy, DGHR and Asyad Group.",
  },
  "fashion-films": {
    title: "Fashion Film Production in Dubai",
    description:
      "Fashion film and motion production by Inspire Media, shot in Dubai and across the UAE.",
  },
  food: {
    title: "Food & Beverage Photography and Film in Dubai",
    description:
      "Restaurant, food and beverage photography and social film production by Inspire Media for hospitality venues in Dubai, UAE.",
  },
  interior: {
    title: "Interior & Architectural Film in Dubai",
    description:
      "Interior and architectural film production by Inspire Media in Dubai, UAE, including DMCC Almas Tower.",
  },
  photos: {
    title: "Photography Portfolio",
    description:
      "Selected photography by Inspire Media, a production studio based in Dubai, UAE.",
  },
};

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}
