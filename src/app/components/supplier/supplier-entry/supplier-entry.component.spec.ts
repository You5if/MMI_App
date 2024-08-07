import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEntryComponent } from './supplier-entry.component';

describe('SupplierEntryComponent', () => {
  let component: SupplierEntryComponent;
  let fixture: ComponentFixture<SupplierEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
