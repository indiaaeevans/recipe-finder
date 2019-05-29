import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchOptions } from '../models/search-options';
import { SearchResultsResponse } from '../models/search-results-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  constructor(private http: HttpClient) {}
  options: SearchOptions;

  searchRecipes(params: SearchOptions) {
    const url = this.makeUrl(params);
    return this.callApi(url);
  }

  makeUrl(params: SearchOptions) {
    let url = `${environment.baseUrl}/recipes/?number=${params.size}&offset=${
      params.offset
    }`;
    if ((params.keyword || '').trim()) {
      url += `&query=${params.keyword.trim()}`;
    }
    if ((params.includeIngredients || '').trim()) {
      url += `&includeIngredients=${params.includeIngredients.trim()}`;
    }
    if ((params.excludeIngredients || '').trim()) {
      url += `&excludeIngredients=${params.excludeIngredients.trim()}`;
    }
    if ((params.type || '').trim()) {
      url += `&type=${params.type.trim()}`;
    }
    return url;
  }

  callApi(url): Observable<SearchResultsResponse> {
    return this.http
      .get<SearchResultsResponse>(url)
      .pipe(map(res => res as SearchResultsResponse));
  }
}
