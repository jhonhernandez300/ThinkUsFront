import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iEmployeeRole } from '../interfaces/iEmployeeRole'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataTransferService {
  private employeeSource = new BehaviorSubject<iEmployeeRole | null>(null);
  currentEmployee = this.employeeSource.asObservable();

  constructor() { }

  changeEmployee(employee: iEmployeeRole) {
    //console.log("En el transfer service ", employee);
    this.employeeSource.next(employee);
  }
}
