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
    <div *ngIf="results">
      <ul class="grid">
        <li
          *ngFor="let res of results?.results"
          tabindex="0"
          class="search-result"
        >
          <mat-card class="animate">
            <div class="img-wrapper">
              <img
                mat-card-image
                [src]="res.image"
                [alt]="res.title"
                class="cropped-img clickable-img"
                (click)="onRecipeSelected(res.id)"
              />
              <div class="button-overlay">
                <a
                  mat-flat-button
                  color="accent"
                  (click)="onRecipeSelected(res.id)"
                  >View Recipe</a
                >
              </div>
            </div>
            <mat-card-title>
              <a
                mat-button
                color="primary"
                (click)="onRecipeSelected(res.id)"
                alt="View Recipe"
                class="truncated"
                [title]="res.title"
                >{{ res.title }}</a
              >
            </mat-card-title>
            <mat-card-subtitle>{{ res.likes }} likes</mat-card-subtitle>
          </mat-card>
        </li>
      </ul>
    </div>
    <div class="no-results" *ngIf="results?.totalResults === 0">
      No Results Found
    </div>
    <mat-paginator
      color="primary"
      [hidden]="!results?.results"
      [length]="results.totalResults"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      (page)="onPageChanged($event)"
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
