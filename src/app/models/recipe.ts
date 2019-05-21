import { ExtendedIngredient } from './extended-ingredient';
import { AnalyzedInstructions } from './analyzed-instructions';

export interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  servings: number;
  preparationMinutes: number;
  cookingMinutes: number;
  sourceUrl: string;
  aggregateLikes: number;
  creditText: string;
  sourceName: string;
  extendedIngredients: ExtendedIngredient[];
  id: string;
  title: string;
  readyInMinutes: number;
  image: string;
  imageType: string;
  dishTypes: string[];
  diets: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstructions[];
}
