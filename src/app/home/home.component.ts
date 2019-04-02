import { Component, OnInit } from '@angular/core';
import { IngredientStoreService } from '../ingredient-store.service';
import { Observable } from 'rxjs';
import { RecipeSearchService } from '../recipe-search.service';
import { Router } from '@angular/router';
const DISH_TYPES = [
  'Main course',
  'Side dish',
  'Dessert',
  'Appetizer',
  'Salad',
  'Bread',
  'Breakfast',
  'Soup',
  'Beverage',
  'Sauce',
  'Drink'
];

@Component({
  selector: 'app-home',
  template: `
    <div class="wrapper">
      <form (ngSubmit)="onQuickSearch()">
        <mat-form-field appearance="outline" class="quick-search-form">
          <button
            mat-button
            color="primary"
            [disabled]="keyword.length === 0"
            matPrefix
            mat-icon-button
            aria-label="Search Button"
            type="submit"
          >
            <mat-icon>search</mat-icon>
          </button>
          <mat-label>Quick Search</mat-label>
          <input
            matInput
            placeholder="skillet lasagna"
            type="text"
            [(ngModel)]="keyword"
            name="keyword"
          />
          <button
            mat-button
            type="button"
            color="accent"
            *ngIf="keyword"
            matSuffix
            mat-icon-button
            aria-label="Clear Button"
            (click)="keyword = ''"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </form>
      <mat-expansion-panel class="mat-elevation-z0">
        <mat-expansion-panel-header>
          <mat-panel-title>
            Advanced Search
          </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="advanced-search-form">
          <div class="form-section">
            <app-autocomplete
              type="include"
              placeholder="Include ingredients..."
            ></app-autocomplete>
            <div *ngIf="(includeIngredients$ | async) as includeIngList">
              <app-chip-list
                [items]="includeIngList"
                type="include"
                color="primary"
              ></app-chip-list>
            </div>
          </div>
          <div class="form-section">
            <app-autocomplete
              type="exclude"
              placeholder="Exclude ingredients..."
            ></app-autocomplete>
            <div *ngIf="(excludeIngredients$ | async) as excludeIngList">
              <app-chip-list
                [items]="excludeIngList"
                type="exclude"
                color="warn"
              ></app-chip-list>
            </div>
          </div>
          <div class="form-section">
            <label id="dish-label">Pick type of dish</label>
            <mat-radio-group
              class="radio-group"
              aria-labelledby="dish-label"
              [(ngModel)]="dishType"
            >
              <mat-radio-button
                class="radio-button"
                *ngFor="let dish of dishTypes"
                [value]="dish"
              >
                {{ dish }}
              </mat-radio-button>
            </mat-radio-group>
          </div>
        </div>
        <div class="advanced-search-button">
          <button
            type="button"
            mat-flat-button
            color="accent"
            (click)="onAdvancedSearch()"
          >
            Search
          </button>
        </div>
      </mat-expansion-panel>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  keyword = '';
  dishTypes = DISH_TYPES;
  dishType: string;
  includeIngredients$: Observable<any>;
  excludeIngredients$: Observable<any>;
  constructor(
    private ingStore: IngredientStoreService,
    private searchService: RecipeSearchService,
    private router: Router
  ) {
    this.includeIngredients$ = ingStore.includeIngredients$;
    this.excludeIngredients$ = ingStore.excludeIngredients$;
  }
  onQuickSearch() {
    const query = {
      keyword: this.keyword
    };
    this.router.navigate(['/search'], { queryParams: query });
  }
  onAdvancedSearch() {
    const query = {
      keyword: this.keyword,
      includeIngredients: this.ingStore.getIngredients('include'),
      excludeIngredients: this.ingStore.getIngredients('exclude'),
      type: this.dishType
    };
    this.router.navigate(['/search'], { queryParams: query });
  }
}
