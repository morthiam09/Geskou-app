import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCategoryComponent } from './cost-category.component';

describe('CostCategoryComponent', () => {
  let component: CostCategoryComponent;
  let fixture: ComponentFixture<CostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
