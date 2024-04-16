import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterAccountComponent } from './cost-center-account.component';

describe('CostCenterAccountComponent', () => {
  let component: CostCenterAccountComponent;
  let fixture: ComponentFixture<CostCenterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
