import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWorkingHoursEntryComponent } from './day-working-hours-entry.component';

describe('DayWorkingHoursEntryComponent', () => {
  let component: DayWorkingHoursEntryComponent;
  let fixture: ComponentFixture<DayWorkingHoursEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayWorkingHoursEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayWorkingHoursEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
