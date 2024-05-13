import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvReportComponent } from './inv-report.component';

describe('InvReportComponent', () => {
  let component: InvReportComponent;
  let fixture: ComponentFixture<InvReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
