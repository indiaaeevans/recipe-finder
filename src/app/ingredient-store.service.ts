import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'immutable';
@Injectable({
  providedIn: 'root'
})
export class IngredientStoreService {
  constructor(private http: HttpClient) {}

  // observable source
  private includeIngredientsSource: BehaviorSubject<
    List<string>
  > = new BehaviorSubject(List(['cucumber', 'tomato']));

  // observable stream
  includeIngredients$ = this.includeIngredientsSource.asObservable();

  addIngredient(type: string, ing: string) {
    if (this.includeIngredientsSource.getValue().indexOf(ing) < 0) {
      this.includeIngredientsSource.next(
        this.includeIngredientsSource.getValue().push(ing)
      );
    }
  }
  removeIngredient(type: string, ing: string) {
    const index = this.includeIngredientsSource.getValue().indexOf(ing);
    if (index >= 0) {
      this.includeIngredientsSource.next(
        this.includeIngredientsSource.getValue().delete(index)
      );
    }
  }

  getIngredients() {
    return this.includeIngredientsSource
      .getValue()
      .concat()
      .join();
  }

  clearIngredients() {
    this.includeIngredientsSource.next(
      this.includeIngredientsSource.getValue().clear()
    );
  }
}
