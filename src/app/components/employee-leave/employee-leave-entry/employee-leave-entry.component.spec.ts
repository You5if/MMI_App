import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveEntryComponent } from './employee-leave-entry.component';

describe('EmployeeLeaveEntryComponent', () => {
  let component: EmployeeLeaveEntryComponent;
  let fixture: ComponentFixture<EmployeeLeaveEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLeaveEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLeaveEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
