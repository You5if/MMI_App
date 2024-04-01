import { TestBed } from '@angular/core/testing';

import { CompanyWeekendService } from './company-weekend.service';

describe('CompanyWeekendService', () => {
  let service: CompanyWeekendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyWeekendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
