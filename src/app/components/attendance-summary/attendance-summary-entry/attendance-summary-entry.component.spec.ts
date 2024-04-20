import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummaryEntryComponent } from './attendance-summary-entry.component';

describe('AttendanceSummaryEntryComponent', () => {
  let component: AttendanceSummaryEntryComponent;
  let fixture: ComponentFixture<AttendanceSummaryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceSummaryEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceSummaryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
