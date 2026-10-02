export interface CropDisease {
  name: string;
  desc: string;
  solution: string;
}

export interface CropNutrition {
  nutrient: string;
  desc: string;
}

export interface CropStats {
  clima: string;
  riego: string;
  suelo: string;
}

export interface PlanHotspot {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  showDot?: boolean;
  tooltipPosition?: "top" | "bottom";
}

export interface CropDetail {
  id: number;
  slug: string;
  name: string;

  heroImage: string;
  planImage: string;

  cardDescription: string;
  heroText?: string;
  featuredNutrients: string[];

  stats: CropStats;

  process: string[];

  diseases: CropDisease[];

  nutrition: CropNutrition[];

  products: string[];
  hotspots?: PlanHotspot[];
}