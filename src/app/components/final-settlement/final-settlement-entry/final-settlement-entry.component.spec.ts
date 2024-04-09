import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSettlementEntryComponent } from './final-settlement-entry.component';

describe('FinalSettlementEntryComponent', () => {
  let component: FinalSettlementEntryComponent;
  let fixture: ComponentFixture<FinalSettlementEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalSettlementEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSettlementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
