import { TestBed, inject } from '@angular/core/testing';

import { DatabaseUrlService } from './database-url.service';

describe('DatabaseUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseUrlService]
    });
  });

  it('should be created', inject([DatabaseUrlService], (service: DatabaseUrlService) => {
    expect(service).toBeTruthy();
  }));
});
