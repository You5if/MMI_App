import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterEntryComponent } from './cost-center-entry.component';

describe('CostCenterEntryComponent', () => {
  let component: CostCenterEntryComponent;
  let fixture: ComponentFixture<CostCenterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
