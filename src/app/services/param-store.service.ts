import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchOptions } from '../models/search-options';

@Injectable({
  providedIn: 'root'
})
export class ParamStoreService {
  constructor() {}

  private searchParams: BehaviorSubject<SearchOptions> = new BehaviorSubject(
    {} as SearchOptions
  );

  searchParams$ = this.searchParams.asObservable();

  updateSearchParams(params: SearchOptions) {
    this.searchParams.next(params);
  }

  clearSearchParams() {
    this.searchParams.next({} as SearchOptions);
  }

  // createParamsArray() {
  //   let params = [];
  //   if (this.searchParams['includeIngredients']) {
  //     const include = this.searchParams['includeIngredients']
  //       .split(',')
  //       .map(value => 'include: ' + value);
  //     Array.prototype.push.apply(params, include);
  //   }
  //   if (this.searchParams['excludeIngredients']) {
  //     const exclude = this.searchParams['includeIngredients']
  //       .split(',')
  //       .map(value => 'exclude: ' + value);
  //     Array.prototype.push.apply(params, exclude);
  //   }
  //   if (this.searchParams['keyword']) {
  //     params.push(this.searchParams['keyword']);
  //   }
  //   if (this.searchParams['type']) {
  //     params.push(this.searchParams['type']);
  //   }
  //   return params;
  // }
}
