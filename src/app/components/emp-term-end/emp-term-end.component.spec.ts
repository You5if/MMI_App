import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTermEndComponent } from './emp-term-end.component';

describe('EmpTermEndComponent', () => {
  let component: EmpTermEndComponent;
  let fixture: ComponentFixture<EmpTermEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpTermEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpTermEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
