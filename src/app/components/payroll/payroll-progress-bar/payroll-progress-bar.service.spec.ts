import { TestBed } from '@angular/core/testing';

import { PayrollProgressBarService } from './payroll-progress-bar.service';

describe('PayrollProgressBarService', () => {
  let service: PayrollProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
