import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterGroupEntryComponent } from './cost-center-group-entry.component';

describe('CostCenterGroupEntryComponent', () => {
  let component: CostCenterGroupEntryComponent;
  let fixture: ComponentFixture<CostCenterGroupEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterGroupEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterGroupEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
