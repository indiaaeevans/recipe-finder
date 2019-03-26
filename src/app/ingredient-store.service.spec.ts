import { TestBed } from '@angular/core/testing';

import { IngredientStoreService } from './ingredient-store.service';

describe('IngredientStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientStoreService = TestBed.get(IngredientStoreService);
    expect(service).toBeTruthy();
  });
});
