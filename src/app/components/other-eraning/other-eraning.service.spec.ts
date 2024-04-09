import { TestBed } from '@angular/core/testing';

import { OtherEraningService } from './other-eraning.service';

describe('OtherEraningService', () => {
  let service: OtherEraningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherEraningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
