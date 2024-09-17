import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGetAllComponent } from './employee-get-all.component';

describe('EmployeeGetAllComponent', () => {
  let component: EmployeeGetAllComponent;
  let fixture: ComponentFixture<EmployeeGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeGetAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
