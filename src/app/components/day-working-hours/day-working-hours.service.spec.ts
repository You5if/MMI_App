import { TestBed } from '@angular/core/testing';

import { DayWorkingHoursService } from './day-working-hours.service';

describe('DayWorkingHoursService', () => {
  let service: DayWorkingHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayWorkingHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
