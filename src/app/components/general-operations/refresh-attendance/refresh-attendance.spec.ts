import { TestBed } from '@angular/core/testing';

import { RefreshAttanceService } from './refresh-attendance.service';

describe('AttendanceService', () => {
  let service: RefreshAttanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshAttanceService);
  });

  it('#RefreshAttance should return success', (done: DoneFn) =>  {
    let data = {
        month: 2,
        year: 2024
    }
    service.refreshAtt(data).subscribe((value) => {
        expect(value).toBe({
            "id": 1,
            "name": "Success"
        });
        done();
      });
  });
});
