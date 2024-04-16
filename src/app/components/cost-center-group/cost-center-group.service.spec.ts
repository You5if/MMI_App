import { TestBed } from '@angular/core/testing';

import { CostCenterGroupService } from './cost-center-group.service';

describe('CostCenterGroupService', () => {
  let service: CostCenterGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCenterGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
