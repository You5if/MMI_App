import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInventoryComponent } from './emp-inventory.component';

describe('EmpInventoryComponent', () => {
  let component: EmpInventoryComponent;
  let fixture: ComponentFixture<EmpInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
