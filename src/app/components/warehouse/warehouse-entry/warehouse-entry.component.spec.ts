import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEntryComponent } from './warehouse-entry.component';

describe('WarehouseEntryComponent', () => {
  let component: WarehouseEntryComponent;
  let fixture: ComponentFixture<WarehouseEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
