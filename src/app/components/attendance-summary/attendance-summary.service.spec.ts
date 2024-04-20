import { TestBed } from '@angular/core/testing';

import { AttendanceSummaryService } from './attendance-summary.service';

describe('AttendanceSummaryService', () => {
  let service: AttendanceSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
