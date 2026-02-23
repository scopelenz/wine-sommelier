export interface WineInfo {
  name: string;
  producer: string;
  vintage: string | null;
  region: string;
  country: string;
  appellation: string | null;
  grapes: string[];
  color: "red" | "white" | "rosé" | "sparkling" | "dessert" | "fortified";
  tastingProfile: {
    body: string;
    sweetness: string;
    acidity: string;
    tannins: string;
    aromas: string[];
    flavors: string[];
    finish: string;
  };
  foodPairings: string[];
  priceRange: {
    low: number;
    high: number;
    currency: string;
  };
  producerStory: string;
  regionContext: string;
  dinnerPartyOneLiner: string;
  qualityAssessment: string;
}

export interface WineListPick {
  rank: number;
  wineName: string;
  listPrice: string;
  estimatedRetail: string;
  markupMultiplier: string;
  reasoning: string;
  matchScore: number;
  isHiddenGem: boolean;
  grapeVariety: string;
  region: string;
  style: string;
}

export interface WineListAnalysis {
  topPicks: WineListPick[];
  overallAssessment: string;
  bestValue: string;
  avoidRecommendation: string | null;
}

export interface TastePreferences {
  favoriteStyles: string[];
  dislikedStyles: string[];
  preferredRegions: string[];
  budgetRange: { min: number; max: number; currency: string };
  adventurousness: "conservative" | "moderate" | "adventurous";
  notes: string;
}
