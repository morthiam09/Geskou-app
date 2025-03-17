import { TestBed } from '@angular/core/testing';

import { CostCalculationService } from './cost-calculation.service';

describe('CostCalculationService', () => {
  let service: CostCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
