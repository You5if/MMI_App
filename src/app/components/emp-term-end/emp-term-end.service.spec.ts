import { TestBed } from '@angular/core/testing';

import { EmpTermEndService } from './emp-term-end.service';

describe('EmpTermEndService', () => {
  let service: EmpTermEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTermEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
