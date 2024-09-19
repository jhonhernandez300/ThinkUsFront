import { Component, OnInit, ViewChild } from '@angular/core';
import { iEmployeeRole } from '../../interfaces/iEmployeeRole';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { EmployeeDataTransferService } from '../../services/employee-data-transfer.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../services/language-change.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-get-all',
  templateUrl: './employee-get-all.component.html',
  styleUrl: './employee-get-all.component.css'
})
export class EmployeeGetAllComponent implements OnInit {
  dataSource = new MatTableDataSource<iEmployeeRole>([]); // Usamos MatTableDataSource para la paginación
  errorMessage: string = '';  
  showDiv = false;  
  userChoice = false;
  displayedColumns: string[] = ['employeeName', 'position', 'employeeDescription', 'employeeState', 'email', 'employeePassword', 'roleName', 'delete', 'update'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(
    private router: Router,
    private translate: TranslateService,
    private employeeService: EmployeeService,
    private languageChangeService: LanguageChangeService,
    public dialog: MatDialog,
    public employeeDataTransferService: EmployeeDataTransferService
  ) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  private loadAllEmployees(): void {
    this.employeeService.GetEmployees().subscribe(
      (response: any) => {
        if (response.message === "There are no employees at the moment") {
          this.handleEmpty(response.message);
        } else {                    
          this.dataSource.data = response.employees; // Actualiza la tabla con los datos recibidos
          this.dataSource.paginator = this.paginator; // Conecta el paginador
        }
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(employee: iEmployeeRole) {
    this.employeeDataTransferService.changeEmployee(employee);
    this.router.navigate(['/employee-update']);        
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userChoice = result;  
      if (this.userChoice) {
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.DeleteEmployee(id).subscribe(
      (response: any) => {
        if (response.message === "Employee not found with that id") {
          this.dialog.open(CloseDialogComponent, {
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
    this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== id);
  }

  downloadCsv() {
    this.employeeService.exportEmployeesToCsv().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.csv';  
      a.click();
      window.URL.revokeObjectURL(url);  
    }, error => {
      console.error('Error al descargar el archivo CSV:', error);
    });
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
}
