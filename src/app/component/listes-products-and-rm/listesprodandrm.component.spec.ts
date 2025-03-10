import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesprodandrmComponent } from './listesprodandrm.component';

describe('ListesprodandrmComponent', () => {
  let component: ListesprodandrmComponent;
  let fixture: ComponentFixture<ListesprodandrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesprodandrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesprodandrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
