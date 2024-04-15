import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryEntryComponent } from './journal-entry-entry.component';

describe('JournalEntryEntryComponent', () => {
  let component: JournalEntryEntryComponent;
  let fixture: ComponentFixture<JournalEntryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalEntryEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalEntryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
