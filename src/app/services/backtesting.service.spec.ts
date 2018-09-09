import { TestBed, inject } from '@angular/core/testing';

import { BacktestingService } from './backtesting.service';

describe('BacktestingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BacktestingService]
    });
  });

  it('should be created', inject([BacktestingService], (service: BacktestingService) => {
    expect(service).toBeTruthy();
  }));
});
