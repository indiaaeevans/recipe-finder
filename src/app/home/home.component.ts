import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngredientStoreService } from '../services/ingredient-store.service';
import { Router } from '@angular/router';
import { List } from 'immutable';
import { SearchOptions } from '../models/search-options';
import { ParamStoreService } from '../services/param-store.service';
import { Observable, Subscription } from 'rxjs';
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
      <mat-card>
        <form (ngSubmit)="onSearch()">
          <mat-form-field appearance="outline" class="quick-search-form">
            <span id="scroll-target"></span>

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
              placeholder="blueberry muffins"
              type="search"
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
        <mat-expansion-panel (afterExpand)="scroll()" class="mat-elevation-z0">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <span>Advanced Search</span>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div class="advanced-search-form">
            <div class="form-section">
              <app-autocomplete
                type="include"
                placeholder="Include ingredients..."
              ></app-autocomplete>
              <div *ngIf="includeIngredients">
                <app-chip-list
                  [items]="includeIngredients"
                  type="include"
                  color="accent"
                ></app-chip-list>
              </div>
            </div>
            <div class="form-section">
              <app-autocomplete
                type="exclude"
                placeholder="Exclude ingredients..."
              ></app-autocomplete>
              <div *ngIf="excludeIngredients">
                <app-chip-list
                  [items]="excludeIngredients"
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
          <button
            type="button"
            class="advanced-search-button"
            mat-flat-button
            color="primary"
            (click)="onSearch()"
          >
            Search
          </button>
        </mat-expansion-panel>
      </mat-card>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  keyword = '';
  dishTypes = DISH_TYPES;
  dishType = '';

  includeIngSubscription: Subscription;
  excludeIngSubscription: Subscription;

  includeIngredients: List<string>;
  excludeIngredients: List<string>;
  constructor(
    private ingStore: IngredientStoreService,
    private paramStore: ParamStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.includeIngSubscription = this.ingStore.includeIngredients$.subscribe(
      value => (this.includeIngredients = value)
    );
    this.excludeIngSubscription = this.ingStore.excludeIngredients$.subscribe(
      value => (this.excludeIngredients = value)
    );
  }
  scroll() {
    const el = document.getElementById('scroll-target');
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  onSearch() {
    const include = this.includeIngredients.join();
    const exclude = this.excludeIngredients.join();
    const query = {} as SearchOptions;
    if (this.keyword.trim().length > 0) {
      query.keyword = this.keyword.trim();
    }
    if (include.length > 0) {
      query.includeIngredients = include;
    }
    if (exclude.length > 0) {
      query.excludeIngredients = exclude;
    }
    if (this.dishType.length > 0) {
      query.type = this.dishType;
    }
    query.size = 10;
    query.offset = 0;
    this.paramStore.updateSearchParams(query);
    this.router.navigate(['/search'], { queryParams: query });
  }
  ngOnDestroy() {
    this.includeIngSubscription.unsubscribe();
    this.excludeIngSubscription.unsubscribe();
  }
}
