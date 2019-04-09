import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  RecipeDetailService,
  Recipe,
  RecipeStep
} from '../recipe-detail.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-recipe',
  template: `
    <div class="grid-wrapper" *ngIf="(recipe$ | async) as recipe">
      <header>
        <button mat-icon-button>
          <mat-icon aria-label="Back to Search">arrow_back</mat-icon>
        </button>

        <button mat-icon-button>
          <mat-icon aria-label="Link to original recipe">link</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon aria-label="Print Recipe">print</mat-icon>
        </button>
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
        <section class="recipe-times">
          <p>Makes {{ recipe.servings }} Servings</p>
          <p>Ready in {{ recipe.readyInMinutes }} minutes</p>
          <p *ngIf="recipe.cookingMinutes">
            Cooking Time: {{ recipe.cookingMinutes }} minutes
          </p>
          <p *ngIf="recipe.preparationMinutes">
            Prep Time: {{ recipe.preparationMinutes }} minutes
          </p>
        </section>
        <section class="diets">
          <div *ngIf="!recipe.vegetarian">
            <mat-icon svgIcon="vegetarian" class="vegetarian"></mat-icon
            ><span class="cdk-visually-hidden">Vegetarian</span>
          </div>
          <div *ngIf="!recipe.vegan">
            <mat-icon svgIcon="vegan" class="vegan"></mat-icon
            ><span class="cdk-visually-hidden">Vegan</span>
          </div>
          <div *ngIf="recipe.glutenFree" class="gluten">
            <mat-icon svgIcon="gluten-free"></mat-icon
            ><span class="cdk-visually-hidden">Gluten-free</span>
          </div>
          <div *ngIf="recipe.dairyFree" class="dairy">
            <mat-icon svgIcon="dairy-free"></mat-icon
            ><span class="cdk-visually-hidden">Dairy-free</span>
          </div>
        </section>
      </aside>
      <footer>
        Credit
        <span class="recipe-credit">
          {{ recipe.creditText }}
        </span>
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
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private recipeService: RecipeDetailService,
    private route: ActivatedRoute
  ) {
    iconRegistry.addSvgIcon(
      'vegan',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/vegan.svg')
    );
    iconRegistry.addSvgIcon(
      'vegetarian',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/vegetarian.svg')
    );
    iconRegistry.addSvgIcon(
      'dairy-free',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/dairy-free.svg')
    );
    iconRegistry.addSvgIcon(
      'gluten-free',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/gluten-free.svg')
    );
  }

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
