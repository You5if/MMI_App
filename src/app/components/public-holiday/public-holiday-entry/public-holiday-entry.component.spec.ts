import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHolidayEntryComponent } from './public-holiday-entry.component';

describe('PublicHolidayEntryComponent', () => {
  let component: PublicHolidayEntryComponent;
  let fixture: ComponentFixture<PublicHolidayEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHolidayEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicHolidayEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
