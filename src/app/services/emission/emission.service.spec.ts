import { TestBed, inject } from '@angular/core/testing';

import { EmissionService } from './emission.service';

describe('EmissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmissionService]
    });
  });

  it('should be created', inject([EmissionService], (service: EmissionService) => {
    expect(service).toBeTruthy();
  }));
});
