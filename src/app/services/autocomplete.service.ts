import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<IngredientResponse> {
    const url = `${environment.baseUrl}/ingredients/suggestions`;
    console.log('searching...', url, query);
    return this.http
      .get<IngredientResponse>(url, { params: { term: query } })
      .pipe(map(res => res as IngredientResponse));
  }
}

export interface IngredientResponse {
  suggestions: Ingredient[];
}
export interface Ingredient {
  name: string;
  image: string;
}
