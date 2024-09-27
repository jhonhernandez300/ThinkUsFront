import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'; 
import { EmployeeGetAllComponent } from './employee-get-all.component';
import { EmployeeService } from '../../services/employee.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { LanguageService } from '../../services/language.service';  

const mockEmployees = {
  employees: [
    {
      id: 1,
      employeeName: 'John Doe',
      position: 'Developer',
      employeeDescription: 'Software Developer',
      employeeState: true,
      email: 'john.doe@example.com',
      employeePassword: 'password123',
      roleId: 2,
      roleName: 'Developer'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      position: 'Manager',
      employeeDescription: 'Project Manager',
      employeeState: true,
      email: 'jane.smith@example.com',
      employeePassword: 'password456',
      roleId: 1,
      roleName: 'Manager'
    }
  ]
};

describe('EmployeeGetAllComponent', () => {
  let component: EmployeeGetAllComponent;
  let fixture: ComponentFixture<EmployeeGetAllComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeGetAllComponent],
      imports: [
        MatDialogModule,
        MatMenuModule,          
        MatTableModule,
        MatPaginatorModule,
        MatCardModule, 
        HttpClientTestingModule, 
        TranslateModule.forRoot(), 
        NoopAnimationsModule,
        HttpClientModule,       
      ],
      providers: [
        EmployeeService,
        { provide: TranslateService, useValue: { setDefaultLang: () => {}, use: () => {} } },  
        { provide: LanguageService, useValue: {} },                                            
        { provide: MatDialogRef, useValue: {} },                                               
        HttpClient                                                                             
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGetAllComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    
    spyOn(employeeService, 'GetEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
  });
  
  it('should set dataSource.data to mockEmployees', () => {
    expect(component.dataSource.data).toEqual(mockEmployees.employees);
  });
});
