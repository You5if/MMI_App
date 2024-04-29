import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderEntryComponent } from './sale-order-entry.component';

describe('SaleOrderEntryComponent', () => {
  let component: SaleOrderEntryComponent;
  let fixture: ComponentFixture<SaleOrderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleOrderEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleOrderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
