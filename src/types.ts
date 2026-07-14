export interface Inspiration {
  text: string;
  image: string;
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
}

export interface MaterialItem {
  image: string;
  caption: string;
}

export interface Concept {
  text: string;
  image: string;
}

export interface FloorPlanContentItem {
  number: string; // e.g. "01", "02"
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  category: string; // e.g. "Residential", "Commercial", "Hospitality", "Community"
  location: string;
  description: string;
  tools: string[];
  moodboardImages: string[];
  inspiration: Inspiration;
  colorPalette?: ColorPaletteItem[];
  materials?: MaterialItem[];
  concept?: Concept;
  process?: string[];
  floorPlanImage: string;
  floorPlanContents: FloorPlanContentItem[];
  extendedDescription: string;
  pullQuote: string;
  galleryImages: string[];
  heroImage: string; // Main background hero for the project detail page and listing card
  heroImages?: string[]; // Optional rotating hero carousel images (landscape orientation)
}
