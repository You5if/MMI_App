import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEntryChildComponent } from './loan-entry-child.component';

describe('LoanEntryChildComponent', () => {
  let component: LoanEntryChildComponent;
  let fixture: ComponentFixture<LoanEntryChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanEntryChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanEntryChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
