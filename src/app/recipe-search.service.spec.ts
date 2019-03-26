import { TestBed } from '@angular/core/testing';

import { RecipeSearchService } from './recipe-search.service';

describe('RecipeSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeSearchService = TestBed.get(RecipeSearchService);
    expect(service).toBeTruthy();
  });
});
