import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCostComponent } from './production-cost.component';

describe('ProductionCostComponent', () => {
  let component: ProductionCostComponent;
  let fixture: ComponentFixture<ProductionCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
