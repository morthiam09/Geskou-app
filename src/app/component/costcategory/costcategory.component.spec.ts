import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcategoryComponent } from './costcategory.component';

describe('CostcategoryComponent', () => {
  let component: CostcategoryComponent;
  let fixture: ComponentFixture<CostcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
