import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInTableComponent } from './search-in-table.component';

describe('SearchInTableComponent', () => {
  let component: SearchInTableComponent;
  let fixture: ComponentFixture<SearchInTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
