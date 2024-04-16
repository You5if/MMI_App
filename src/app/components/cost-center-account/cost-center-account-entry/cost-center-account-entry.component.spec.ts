import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterAccountEntryComponent } from './cost-center-account-entry.component';

describe('CostCenterAccountEntryComponent', () => {
  let component: CostCenterAccountEntryComponent;
  let fixture: ComponentFixture<CostCenterAccountEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterAccountEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterAccountEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
