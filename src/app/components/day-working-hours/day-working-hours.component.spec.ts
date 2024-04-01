import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWorkingHoursComponent } from './day-working-hours.component';

describe('DayWorkingHoursComponent', () => {
  let component: DayWorkingHoursComponent;
  let fixture: ComponentFixture<DayWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayWorkingHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
