import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailService {
  constructor(private http: HttpClient) {}

  getRecipe(id): Observable<Recipe> {
    const url = `${environment.baseUrl}/recipes/${id}`;
    return this.http.get(url).pipe(map(res => res as Recipe));
  }
}
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
export interface ExtendedIngredient {
  id: string;
  aisle: string;
  image: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  originalString: string;
}
export interface AnalyzedInstructions {
  name: string;
  steps: RecipeStep[];
}
export interface RecipeStep {
  number: number;
  step: string;
  ingredients: [
    {
      id: number;
      name: string;
      image: string;
    }
  ];
  equipment: [
    {
      id: number;
      name: string;
      image: string;
    }
  ];
}
