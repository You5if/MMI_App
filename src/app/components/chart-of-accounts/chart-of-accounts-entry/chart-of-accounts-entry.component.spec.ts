import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsEntryComponent } from './chart-of-accounts-entry.component';

describe('ChartOfAccountsEntryComponent', () => {
  let component: ChartOfAccountsEntryComponent;
  let fixture: ComponentFixture<ChartOfAccountsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartOfAccountsEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartOfAccountsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
