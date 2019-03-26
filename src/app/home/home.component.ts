import { Component, OnInit } from '@angular/core';
import { IngredientStoreService } from '../ingredient-store.service';
import { Observable } from 'rxjs';
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
      <mat-form-field appearance="outline" class="quick-search-form">
        <button
          mat-button
          color="primary"
          matPrefix
          mat-icon-button
          aria-label="Search Button"
          (click)="onSearch(input)"
        >
          <mat-icon>search</mat-icon>
        </button>
        <mat-label>Quick Search</mat-label>
        <input
          matInput
          placeholder="skillet lasagna"
          type="text"
          [(ngModel)]="input"
        />
        <button
          mat-button
          color="accent"
          *ngIf="input"
          matSuffix
          mat-icon-button
          aria-label="Clear Button"
          (click)="input = ''"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <div class="quick-search-button">
        <button
          type="submit"
          mat-flat-button
          color="accent"
          (click)="onSearch(input)"
        >
          Search
        </button>
      </div>
    </div>
    <div class="advanced-search-wrapper">
      <mat-accordion>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              Include & Exclude Ingredients
            </mat-panel-title>
          </mat-expansion-panel-header>
          <app-autocomplete
            type="include"
            placeholder="Include ingredients..."
          ></app-autocomplete>
          <div *ngIf="(includeIngredients$ | async) as includeIngList">
            <app-chip-list
              [items]="includeIngList"
              type="include"
            ></app-chip-list>
          </div>
        </mat-expansion-panel>

        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              More Options
            </mat-panel-title>
          </mat-expansion-panel-header>
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
          <div>You picked: {{ dishType }}</div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  input = '';
  dishTypes = DISH_TYPES;
  dishType: string;
  includeIngredients$: Observable<any>;
  constructor(private ingStore: IngredientStoreService) {
    this.includeIngredients$ = ingStore.includeIngredients$;
  }
  onSearch(input) {
    console.log(input, ' was searched');
  }
}
