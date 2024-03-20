import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEntryComponent } from './loan-entry.component';

describe('LoanEntryComponent', () => {
  let component: LoanEntryComponent;
  let fixture: ComponentFixture<LoanEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
