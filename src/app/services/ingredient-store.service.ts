import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class IngredientStoreService {
  constructor() {}

  private includeIngredientsSource: BehaviorSubject<
    List<string>
  > = new BehaviorSubject(List([]));

  private excludeIngredientsSource: BehaviorSubject<
    List<string>
  > = new BehaviorSubject(List([]));

  includeIngredients$ = this.includeIngredientsSource.asObservable();
  excludeIngredients$ = this.excludeIngredientsSource.asObservable();

  addIngredient(type: string, ing: string) {
    switch (type) {
      case 'include': {
        this.addToSource(this.includeIngredientsSource, ing);
        break;
      }
      case 'exclude': {
        this.addToSource(this.excludeIngredientsSource, ing);
        break;
      }
      default: {
        return 'error updating ingredients';
      }
    }
  }
  removeIngredient(type: string, ing: string) {
    switch (type) {
      case 'include': {
        this.removeFromSource(this.includeIngredientsSource, ing);
        break;
      }
      case 'exclude': {
        this.removeFromSource(this.excludeIngredientsSource, ing);
        break;
      }
      default: {
        return 'error updating ingredients';
      }
    }
  }

  // we want to send empty list if user is starting a "fresh" search
  clearIngredients() {
    this.includeIngredientsSource.next(List([]));
    this.excludeIngredientsSource.next(List([]));
  }

  addToSource(source: BehaviorSubject<List<string>>, item: string) {
    if (source.getValue().indexOf(item) < 0) {
      source.next(source.getValue().push(item));
    }
  }

  removeFromSource(source: BehaviorSubject<List<string>>, item: string) {
    const index = source.getValue().indexOf(item);
    if (index >= 0) {
      source.next(source.getValue().delete(index));
    }
  }
}
