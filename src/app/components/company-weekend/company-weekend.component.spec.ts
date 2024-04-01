import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWeekendComponent } from './company-weekend.component';

describe('CompanyWeekendComponent', () => {
  let component: CompanyWeekendComponent;
  let fixture: ComponentFixture<CompanyWeekendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyWeekendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
