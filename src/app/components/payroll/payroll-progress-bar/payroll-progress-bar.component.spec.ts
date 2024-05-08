import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProgressBarComponent } from './payroll-progress-bar.component';

describe('PayrollProgressBarComponent', () => {
  let component: PayrollProgressBarComponent;
  let fixture: ComponentFixture<PayrollProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
