import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEntryComponent } from './purchase-order-entry.component';

describe('PurchaseOrderEntryComponent', () => {
  let component: PurchaseOrderEntryComponent;
  let fixture: ComponentFixture<PurchaseOrderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseOrderEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
