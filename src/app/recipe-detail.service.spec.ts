import { TestBed } from '@angular/core/testing';

import { RecipeDetailService } from './recipe-detail.service';

describe('RecipeDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeDetailService = TestBed.get(RecipeDetailService);
    expect(service).toBeTruthy();
  });
});
