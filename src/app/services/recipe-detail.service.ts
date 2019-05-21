import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailService {
  constructor(private http: HttpClient) {}

  getRecipe(id): Observable<Recipe> {
    const url = `${environment.baseUrl}/recipes/${id}`;
    return this.http.get(url).pipe(map(res => res as Recipe));
  }

  public makeIngredientImgUrl(name) {
    return `https://spoonacular.com/cdn/ingredients_100x100/${name}`;
  }

  public makeEquipmentImgUrl(name) {
    return `https://spoonacular.com/cdn/equipment_100x100/${name}`;
  }
}
