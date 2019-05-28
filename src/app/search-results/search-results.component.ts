import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RecipeSearchService } from '../services/recipe-search.service';
import { IngredientStoreService } from '../services/ingredient-store.service';
import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';
import { SearchOptions } from '../models/search-options';
import { SearchResultsResponse } from '../models/search-results-response';
import { ParamStoreService } from '../services/param-store.service';

@Component({
  selector: 'app-search-results',
  template: `
    <div *ngIf="results$ | async as results">
      <ul class="grid">
        <li
          *ngFor="let res of results?.results"
          tabindex="0"
          class="search-result"
        >
          <mat-card class="beige animate">
            <div class="img-wrapper">
              <img
                mat-card-image
                [src]="res.image"
                [alt]="res.title"
                onerror="this.src='../../assets/placeholder-img.png'"
                class="cropped-img clickable-img"
                (click)="onRecipeSelected(res.id)"
              />
              <div class="image-hover">
                <a
                  alt="View Recipe"
                  [title]="'View ' + res.title"
                  class="button"
                  mat-mini-fab
                  (click)="onRecipeSelected(res.id)"
                >
                  <mat-icon>description</mat-icon></a
                >
              </div>
            </div>
            <mat-card-content>
              <mat-card-title>
                <a
                  [title]="'View ' + res.title"
                  class="link search-result-title"
                  (click)="onRecipeSelected(res.id)"
                  >{{ res.title }}</a
                >
              </mat-card-title>
            </mat-card-content>
          </mat-card>
        </li>
      </ul>
      <div class="no-results" *ngIf="results?.totalResults === 0">
        <img
          class="no-results-img"
          src="../../assets/search-icon.png"
          alt="No Results Found"
        />
        <h4>No Results Found!</h4>
      </div>
      <div [hidden]="results?.totalResults < 1">
        <mat-paginator
          (page)="onPageChanged($event)"
          color="primary"
          [length]="results?.totalResults"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
        >
        </mat-paginator>
      </div>
    </div>
  `,
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results$: Observable<SearchResultsResponse>;
  pageSize = 10;
  pageSizeOptions = [10, 20];
  searchParams: SearchOptions;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private searchService: RecipeSearchService,
    private ingStore: IngredientStoreService,
    private paramStore: ParamStoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeSearch();
  }

  initializeSearch() {
    this.results$ = this.paramStore.searchParams$.pipe(
      map(params => {
        this.searchParams = params as SearchOptions;
        return this.searchService.searchRecipes(params);
      }),
      mergeAll()
    );
  }

  onRecipeSelected(id) {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     searchedFor: this.searchParams
    //   }
    // };
    this.router.navigate([`/recipe/${id}`]);
  }

  onPageChanged(event: PageEvent) {
    this.scrollToTop();
    const pageSize = event.pageSize;
    const pageOffset = event.pageSize * event.pageIndex;
    this.searchParams.size = pageSize;
    this.searchParams.offset = pageOffset;
    this.paramStore.updateSearchParams(this.searchParams);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.searchParams,
      queryParamsHandling: 'merge'
    });
  }
  scrollToTop() {
    const el = document.getElementById('top-of-page');
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  ngOnDestroy() {
    this.ingStore.clearIngredients();
  }
}
