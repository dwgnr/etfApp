import { TestBed, inject } from '@angular/core/testing';

import { LoadguardService } from './loadguard.service';

describe('LoadguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadguardService]
    });
  });

  it('should be created', inject([LoadguardService], (service: LoadguardService) => {
    expect(service).toBeTruthy();
  }));
});
