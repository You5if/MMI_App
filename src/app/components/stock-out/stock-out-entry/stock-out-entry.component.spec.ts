import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutEntryComponent } from './stock-out-entry.component';

describe('StockOutEntryComponent', () => {
  let component: StockOutEntryComponent;
  let fixture: ComponentFixture<StockOutEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockOutEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockOutEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
