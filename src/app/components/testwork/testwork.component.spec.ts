import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestworkComponent } from './testwork.component';

describe('TestworkComponent', () => {
  let component: TestworkComponent;
  let fixture: ComponentFixture<TestworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
