import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RecipeSearchService,
  SearchResultsResponse
} from '../recipe-search.service';
import { IngredientStoreService } from '../ingredient-store.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-search-results',
  template: `
    <div *ngIf="results" class="cards">
      <ul>
        <li *ngFor="let res of results?.results">
          <mat-card>{{ res | json }}</mat-card>
        </li>
      </ul>
    </div>
    <mat-paginator
      [length]="10"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
    >
    </mat-paginator>
  `,
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results$: Observable<SearchResultsResponse>;
  results: SearchResultsResponse;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: RecipeSearchService,
    private ingStore: IngredientStoreService
  ) {}

  ngOnInit() {
    this.results$ = this.route.queryParamMap.pipe(
      switchMap(queryParams => {
        const options = {
          keyword: '',
          includeIngredients: queryParams.get('includeIngredients'),
          excludeIngredients: '',
          size: this.pageSize,
          offset: 0
        };
        return this.searchService.complexSearch(options);
      })
    );
    this.results$.subscribe(data => (this.results = data));
  }
  onRecipeSelected(id) {
    this.router.navigate([`/recipe/${id}`]);
  }
  onPageChanged(event: PageEvent) {
    return null;
  }
  ngOnDestroy() {
    this.ingStore.clearIngredients();
    console.log('cleared ingredient store');
  }
}
