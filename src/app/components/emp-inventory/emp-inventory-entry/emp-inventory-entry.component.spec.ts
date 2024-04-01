import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInventoryEntryComponent } from './emp-inventory-entry.component';

describe('EmpInventoryEntryComponent', () => {
  let component: EmpInventoryEntryComponent;
  let fixture: ComponentFixture<EmpInventoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpInventoryEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpInventoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
