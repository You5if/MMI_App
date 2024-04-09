import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentEntryComponent } from './incident-entry.component';

describe('IncidentEntryComponent', () => {
  let component: IncidentEntryComponent;
  let fixture: ComponentFixture<IncidentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
