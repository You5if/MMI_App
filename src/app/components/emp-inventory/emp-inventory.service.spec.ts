import { TestBed } from '@angular/core/testing';

import { EmpInventoryService } from './emp-inventory.service';

describe('EmpInventoryService', () => {
  let service: EmpInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
