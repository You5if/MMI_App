import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceEntryComponent } from './leave-balance-entry.component';

describe('LeaveBalanceEntryComponent', () => {
  let component: LeaveBalanceEntryComponent;
  let fixture: ComponentFixture<LeaveBalanceEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveBalanceEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveBalanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
