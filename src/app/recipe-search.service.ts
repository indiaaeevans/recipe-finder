import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  constructor() {}

  quickSearch(query) {
    return query;
  }
  complexSearch(queryObject) {
    return queryObject;
  }
}
