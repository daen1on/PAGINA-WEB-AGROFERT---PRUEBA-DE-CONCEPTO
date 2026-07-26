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

export interface CropDetail {
  id: number;
  slug: string;
  name: string;

  heroImage: string;
  planImage: string;

  cardDescription: string;
  featuredNutrients: string[];

  stats: CropStats;

  process: string[];

  diseases: CropDisease[];

  nutrition: CropNutrition[];

  products: string[];
}