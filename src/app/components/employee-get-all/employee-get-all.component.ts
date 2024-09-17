import { Component, OnInit } from '@angular/core';
import { iEmployeeFull } from '../../interfaces/iEmployeeFull';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-get-all',
  templateUrl: './employee-get-all.component.html',
  styleUrl: './employee-get-all.component.css'
})
export class EmployeeGetAllComponent implements OnInit {
  employees: iEmployeeFull[] = [];
  errorMessage: string = '';  
  showDiv = false;  
  displayedColumns: string[] = ['employeeName', 'Position', 'employeeDescription', 'employeeState', 'email', 'employeePassword', 'roleId', 'delete', 'update'];

  constructor(
    private employeeService: EmployeeService    
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  private loadAllEmployees(): void {
    this.employeeService.GetEmployees().subscribe(
      (response: any) => {
        console.log(response);
        if (response.message === "There are no employees at the moment") {
          this.handleEmpty(response.message);
        } else {          
          this.employees = response;
        }
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  private handleEmpty(message: string): void {
    this.errorMessage = message;
    this.showTemporaryDiv();
  }

  private showTemporaryDiv(): void {
    this.showDiv = true;
    setTimeout(() => this.showDiv = false, 5000);
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = error;
    this.showTemporaryDiv();
  }

  update(id: number){

  }

  delete(id: number){
    
  }
}
