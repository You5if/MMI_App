import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReturnEntryComponent } from './stock-return-entry.component';

describe('StockReturnEntryComponent', () => {
  let component: StockReturnEntryComponent;
  let fixture: ComponentFixture<StockReturnEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockReturnEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockReturnEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
