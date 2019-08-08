import { TestBed } from '@angular/core/testing';

import { AuthorServiceService } from './author-service.service';

describe('AuthorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);
    expect(service).toBeTruthy();
  });
});
