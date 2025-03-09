import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostCategoryComponent } from './add-cost-category.component';

describe('AddCostCategoryComponent', () => {
  let component: AddCostCategoryComponent;
  let fixture: ComponentFixture<AddCostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCostCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
