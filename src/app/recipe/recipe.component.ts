import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  RecipeDetailService,
  Recipe,
  RecipeStep
} from '../recipe-detail.service';

@Component({
  selector: 'app-recipe',
  template: `
    <div class="grid-wrapper" *ngIf="(recipe$ | async) as recipe">
      <header>
        <div class="recipe-buttons">
          <span>Previous</span>
          <span>Next</span>
        </div>
      </header>
      <nav>
        <h4 class="recipe-title">{{ recipe.title | uppercase }}</h4>
        <mat-list class="ing-list">
          <mat-list-item *ngFor="let ingredient of recipe.extendedIngredients">
            <img
              *ngIf="ingredient.image; else noImage"
              [src]="makeIngredientImgUrl(ingredient.image)"
              [alt]="ingredient.name"
              matListAvatar
            />

            <p matLine>{{ ingredient.amount + ' ' + ingredient.unit }}</p>
            <h3 matLine>{{ ingredient.name }}</h3>
          </mat-list-item>
        </mat-list>
      </nav>
      <main>
        <img [src]="recipe.image" [alt]="recipe.title" class="recipe-img" />
        <div class="recipe-options">
          <mat-slide-toggle #show>
            <h6>Toggle Images</h6>
          </mat-slide-toggle>
        </div>

        <ol class="steps-list">
          <li *ngFor="let step of recipe.analyzedInstructions[0].steps">
            <h6>Step {{ step.number }}</h6>
            <div class="step-details" *ngIf="show.checked">
              <ul *ngIf="step.ingredients.length > 0">
                <li *ngFor="let ingredient of step.ingredients">
                  <img
                    class="small-img"
                    *ngIf="ingredient.image; else noImage"
                    [src]="makeIngredientImgUrl(ingredient.image)"
                    [alt]="ingredient.name"
                  />
                </li>
              </ul>
              <ul *ngIf="step.equipment.length > 0">
                <li *ngFor="let equip of step.equipment">
                  <img
                    class="small-img"
                    *ngIf="equip.image; else noImage"
                    [src]="makeEquipmentImgUrl(equip.image)"
                    [alt]="equip.name"
                  />
                </li>
              </ul>
            </div>
            <p>{{ step.step }}</p>
          </li>
        </ol>
      </main>
      <aside>
        <ul class="recipe-details">
          <li>Makes {{ recipe.servings }} Servings</li>
          <li>Ready in {{ recipe.readyInMinutes }} minutes</li>
          <li *ngIf="recipe.cookingMinutes">
            Cooking Time: {{ recipe.cookingMinutes }}
          </li>
          <li *ngIf="recipe.preparationMinutes">
            Prep Time: {{ recipe.preparationMinutes }}
          </li>
          <li *ngIf="recipe.vegetarian">Vegetarian</li>
          <li *ngIf="recipe.vegan">Vegan</li>
          <li *ngIf="recipe.glutenFree">Gluten-free</li>
          <li *ngIf="recipe.dairyFree">Dairy-free</li>
        </ul>
      </aside>
      <footer>
        <a [href]="recipe.sourceUrl" class="recipe-credit">{{
          recipe.creditText
        }}</a>
      </footer>
    </div>
    <ng-template #noImage>
      <img
        src="https://via.placeholder.com/25"
        alt="Image is unavailable"
        matListAvatar
      />
    </ng-template>
  `,
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  id: string;
  recipe$: Observable<Recipe>;
  selectedStep: RecipeStep;
  constructor(
    private recipeService: RecipeDetailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id');
        return this.recipeService.getRecipe(this.id);
      })
    );
  }

  onSelectionChange(selected) {
    this.selectedStep = selected as RecipeStep;
  }
  makeIngredientImgUrl(name) {
    return `https://spoonacular.com/cdn/ingredients_100x100/${name}`;
  }
  makeEquipmentImgUrl(name) {
    return `https://spoonacular.com/cdn/equipment_100x100/${name}`;
  }
}
