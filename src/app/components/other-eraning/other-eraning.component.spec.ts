import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEraningComponent } from './other-eraning.component';

describe('OtherEraningComponent', () => {
  let component: OtherEraningComponent;
  let fixture: ComponentFixture<OtherEraningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherEraningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherEraningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
