import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './recipe/recipe.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteService } from './services/autocomplete.service';
import { IngredientStoreService } from './services/ingredient-store.service';
import { ChipListComponent } from './chip-list/chip-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CustomIconService } from './services/custom-icon.service';
import { GlobalErrorHandler } from './global-error-handler.service';
import { ParamStoreService } from './services/param-store.service';
import { AnimatedInputComponent } from './animated-input/animated-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RecipeComponent,
    AutocompleteComponent,
    ChipListComponent,
    SearchResultsComponent,
    AnimatedInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AutocompleteService,
    IngredientStoreService,
    ParamStoreService,
    CustomIconService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
