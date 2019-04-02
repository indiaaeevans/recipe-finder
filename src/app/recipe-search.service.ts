import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  constructor(private http: HttpClient) {}

  quickSearch(query) {
    return query;
  }
  complexSearch(options: SearchOptions): Observable<SearchResultsResponse> {
    let url = `${environment.baseUrl}/recipes/?number=${options.size}&offset=${
      options.offset
    }`;

    if ((options.includeIngredients || '').trim()) {
      url += `&includeIngredients=${options.includeIngredients.trim()}`;
    }
    if ((options.excludeIngredients || '').trim()) {
      url += `&excludeIngredients=${options.excludeIngredients.trim()}`;
    }
    return this.http
      .get<SearchResultsResponse>(url)
      .pipe(map(res => res as SearchResultsResponse));
  }
}
export interface SearchOptions {
  keyword: string;
  includeIngredients: string;
  excludeIngredients: string;
  size: number;
  offset: number;
}
export interface SearchResultsResponse {
  results: [];
}
