import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RecipeDetailService } from '../services/recipe-detail.service';
import { CustomIconService } from '../services/custom-icon.service';
import { Recipe } from '../models/recipe';
import { ParamStoreService } from '../services/param-store.service';
import { SearchOptions } from '../models/search-options';

@Component({
  selector: 'app-recipe',
  template: `
    <div
      class="grid-wrapper mat-elevation-z4"
      *ngIf="recipe$ | async as recipe"
    >
      <header>
        <section>
          <a
            mat-icon-button
            class="recipe-action"
            title="Back to Search Results"
            routerLink="/search"
            [queryParams]="searchedFor"
          >
            <mat-icon aria-label="Back to Search">arrow_back</mat-icon>
          </a>
        </section>
        <section>
          <button
            mat-icon-button
            class="recipe-action"
            (click)="openRecipeSource(recipe.sourceUrl)"
          >
            <mat-icon aria-label="Go to Recipe Source">link</mat-icon>
          </button>
          <button mat-icon-button class="recipe-action">
            <mat-icon aria-label="Print Recipe">print</mat-icon>
          </button>
        </section>
      </header>
      <nav>
        <h4 class="recipe-title">{{ recipe.title | uppercase }}</h4>
        <mat-list class="ing-list">
          <mat-list-item *ngFor="let ingredient of recipe.extendedIngredients">
            <img
              *ngIf="ingredient.image; else noImage"
              [src]="getIngredientImg(ingredient.image)"
              [alt]="ingredient.name"
              matListAvatar
            />

            <p matLine>{{ ingredient.amount + ' ' + ingredient.unit }}</p>
            <h3 matLine>{{ ingredient.name }}</h3>
          </mat-list-item>
        </mat-list>
      </nav>
      <main>
        <img
          [src]="recipe.image"
          [alt]="recipe.title"
          class="recipe-img"
          onerror="this.src='../../assets/placeholder-img.png'"
        />
        <div class="recipe-options">
          <mat-slide-toggle #show>
            <h6 class="mat-caption">Toggle Images</h6>
          </mat-slide-toggle>
        </div>

        <ol class="steps-list">
          <li *ngFor="let step of recipe.analyzedInstructions[0].steps">
            <h6 class="mat-small step-number">Step {{ step.number }}</h6>
            <div class="step-details" *ngIf="show.checked">
              <ul *ngIf="step.ingredients.length > 0">
                <li *ngFor="let ingredient of step.ingredients">
                  <img
                    class="small-img"
                    *ngIf="ingredient.image; else noImage"
                    [src]="getIngredientImg(ingredient.image)"
                    [alt]="ingredient.name"
                  />
                </li>
              </ul>
              <ul *ngIf="step.equipment.length > 0">
                <li *ngFor="let equip of step.equipment">
                  <img
                    class="small-img"
                    *ngIf="equip.image; else noImage"
                    [src]="getEquipmentImg(equip.image)"
                    [alt]="equip.name"
                  />
                </li>
              </ul>
            </div>
            <p class="mat-body">{{ step.step }}</p>
          </li>
        </ol>
      </main>
      <aside>
        <mat-list>
          <h3 matSubheader>Recipe Details</h3>

          <mat-list-item>
            <mat-icon mat-list-icon>timer</mat-icon>
            <h4 mat-line>{{ recipe.readyInMinutes }} min</h4>
            <p mat-line>total time</p>
          </mat-list-item>
          <mat-list-item *ngIf="recipe.preparationMinutes">
            <mat-icon mat-list-icon>kitchen</mat-icon>
            <h4 mat-line>{{ recipe.preparationMinutes }} min</h4>
            <p mat-line>prep time</p>
          </mat-list-item>

          <mat-list-item *ngIf="recipe.cookingMinutes">
            <mat-icon mat-list-icon>whatshot</mat-icon>
            <h4 mat-line>{{ recipe.cookingMinutes }} min</h4>
            <p mat-line>cook time</p>
          </mat-list-item>

          <mat-list-item>
            <mat-icon mat-list-icon>view_module</mat-icon>
            <h4 mat-line>Serves {{ recipe.servings }}</h4>
          </mat-list-item>
          <mat-divider></mat-divider>

          <h3 matSubheader>Dietary Restrictions</h3>

          <mat-list-item *ngIf="recipe.vegetarian">
            <mat-icon
              mat-list-icon
              svgIcon="vegetarian"
              class="vegetarian"
            ></mat-icon>
            <p mat-line>Vegetarian</p>
          </mat-list-item>
          <mat-list-item *ngIf="recipe.vegan">
            <mat-icon mat-list-icon svgIcon="vegan" class="vegan"></mat-icon>
            <p mat-line>Vegan</p>
          </mat-list-item>
          <mat-list-item *ngIf="recipe.glutenFree">
            <mat-icon
              mat-list-icon
              svgIcon="gluten-free"
              class="gluten-free"
            ></mat-icon>
            <p mat-line>Gluten-free</p>
          </mat-list-item>
          <mat-list-item *ngIf="recipe.dairyFree">
            <mat-icon
              mat-list-icon
              svgIcon="dairy-free"
              class="dairy-free"
            ></mat-icon>
            <p mat-line>Dairy-free</p>
          </mat-list-item>
        </mat-list>
        <section class="diets"></section>
      </aside>
      <footer>
        Credit
        <span class="recipe-credit">
          {{ recipe.creditText }}
        </span>
      </footer>
      <ng-template #noImage>
        <img
          src="https://via.placeholder.com/25"
          alt="Image is unavailable"
          matListAvatar
        />
      </ng-template>
    </div>
  `,
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  id: string;
  recipe$: Observable<Recipe>;
  searchedFor: SearchOptions;
  constructor(
    private recipeService: RecipeDetailService,
    private route: ActivatedRoute,
    private customIconService: CustomIconService,
    private paramStore: ParamStoreService
  ) {}

  ngOnInit() {
    this.getRecipe();
    this.getSearchedFor();
    this.customIconService.init();
  }
  getRecipe() {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id');
        return this.recipeService.getRecipe(this.id);
      })
    );
  }
  getSearchedFor() {
    this.paramStore.searchParams$.subscribe(
      params => (this.searchedFor = params as SearchOptions)
    );
  }
  openRecipeSource(link) {
    window.open(link, '_blank');
  }
  getIngredientImg(name) {
    return this.recipeService.makeIngredientImgUrl(name);
  }
  getEquipmentImg(name) {
    return this.recipeService.makeEquipmentImgUrl(name);
  }
}
