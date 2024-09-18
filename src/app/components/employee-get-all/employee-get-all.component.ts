import { Component, OnInit } from '@angular/core';
import { iEmployeeRole } from '../../interfaces/iEmployeeRole';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { EmployeeDataTransferService } from '../../services/employee-data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-get-all',
  templateUrl: './employee-get-all.component.html',
  styleUrl: './employee-get-all.component.css'
})
export class EmployeeGetAllComponent implements OnInit {
  employees: iEmployeeRole[] = [];
  errorMessage: string = '';  
  showDiv = false;  
  userChoice = false;
  displayedColumns: string[] = ['employeeName', 'position', 'employeeDescription', 'employeeState', 'email', 'employeePassword', 'roleName', 'delete', 'update'];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public employeeDataTransferService: EmployeeDataTransferService
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
          this.employees = response.employees;
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

  update(employee: iEmployeeRole) {
    //console.log("En el get-all ", employee);
    this.employeeDataTransferService.changeEmployee(employee);
    this.router.navigate(['/employee-update']);    
  }

  delete(id: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.userChoice = result;  
      if(this.userChoice == true){
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: number): void{
    this.employeeService.DeleteEmployee(id).subscribe(
      (response: any) => {
        //console.log(response);
        if (response.message === "Employee not found with that id") {
          this.dialog.open(CloseDialogComponent, {
             // Pasar el mensaje al diálogo
            data: { message: response.message } 
          });
        } else {          
          this.dialog.open(CloseDialogComponent, {            
           data: { message: "Employee deleted" } 
         });
         this.updateEmployees(id);
        }
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  private updateEmployees(id: number): void {
    this.employees = this.employees.filter(employee => employee.id !== id);
  }

  downloadCsv() {
    this.employeeService.exportEmployeesToCsv().subscribe((response: Blob) => {
      // Crea un enlace temporal para descargar el archivo
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.csv';  
      a.click();
      // Limpia la URL una vez descargada
      window.URL.revokeObjectURL(url);  
    }, error => {
      console.error('Error al descargar el archivo CSV:', error);
    });
  }
}
