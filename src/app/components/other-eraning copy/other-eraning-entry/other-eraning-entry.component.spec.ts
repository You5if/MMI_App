import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEraningEntryComponent } from './other-eraning-entry.component';

describe('OtherEraningEntryComponent', () => {
  let component: OtherEraningEntryComponent;
  let fixture: ComponentFixture<OtherEraningEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherEraningEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherEraningEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
