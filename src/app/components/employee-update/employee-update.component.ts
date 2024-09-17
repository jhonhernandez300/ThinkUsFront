import { Component, OnInit } from '@angular/core';
import { iEmployeeFull } from '../../interfaces/iEmployeeFull';
import { EmployeeDataTransferService } from '../../services/employee-data-transfer.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {
  employee: iEmployeeFull | null = null;

   constructor(private employeeDataTransferService: EmployeeDataTransferService){}

   ngOnInit() {
    this.employeeDataTransferService.currentEmployee.subscribe(employee => {
      this.employee = employee;
      console.log("En update ", this.employee);
    });
  }
}
