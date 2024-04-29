import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMoveEntryComponent } from './stock-move-entry.component';

describe('StockMoveEntryComponent', () => {
  let component: StockMoveEntryComponent;
  let fixture: ComponentFixture<StockMoveEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockMoveEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMoveEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
