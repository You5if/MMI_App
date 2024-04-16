import { TestBed } from '@angular/core/testing';

import { CostCenterAccountService } from './cost-center-account.service';

describe('CostCenterAccountService', () => {
  let service: CostCenterAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCenterAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
