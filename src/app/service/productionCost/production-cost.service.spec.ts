import { TestBed } from '@angular/core/testing';

import { ProductionCostService } from './production-cost.service';

describe('ProductionCostService', () => {
  let service: ProductionCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
