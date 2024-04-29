import { TestBed } from '@angular/core/testing';

import { StockMoveService } from './stock-move.service';

describe('StockMoveService', () => {
  let service: StockMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
