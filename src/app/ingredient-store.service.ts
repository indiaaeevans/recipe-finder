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

  private excludeIngredientsSource: BehaviorSubject<
    List<string>
  > = new BehaviorSubject(List(['flour', 'butter']));

  // observable stream
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
    // if (this.includeIngredientsSource.getValue().indexOf(ing) < 0) {
    //   this.includeIngredientsSource.next(
    //     this.includeIngredientsSource.getValue().push(ing)
    //   );
    // }
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
    // const index = this.includeIngredientsSource.getValue().indexOf(ing);
    // if (index >= 0) {
    //   this.includeIngredientsSource.next(
    //     this.includeIngredientsSource.getValue().delete(index)
    //   );
    // }
  }

  getIngredients(type) {
    if (type === 'include') {
      return this.includeIngredientsSource
        .getValue()
        .concat()
        .join();
    } else if (type === 'exclude') {
      return this.excludeIngredientsSource
        .getValue()
        .concat()
        .join();
    }
  }

  clearIngredients() {
    this.includeIngredientsSource.next(
      this.includeIngredientsSource.getValue().clear()
    );
    this.excludeIngredientsSource.next(
      this.excludeIngredientsSource.getValue().clear()
    );
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
