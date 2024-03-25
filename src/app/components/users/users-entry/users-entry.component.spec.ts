import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEntryComponent } from './users-entry.component';

describe('UsersEntryComponent', () => {
  let component: UsersEntryComponent;
  let fixture: ComponentFixture<UsersEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
