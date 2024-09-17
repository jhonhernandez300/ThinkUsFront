import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iEmployeeFull } from '../interfaces/iEmployeeFull'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataTransferService {
  private employeeSource = new BehaviorSubject<iEmployeeFull | null>(null);
  currentEmployee = this.employeeSource.asObservable();

  constructor() { }

  changeEmployee(employee: iEmployeeFull) {
    //console.log("En el transfer service ", employee);
    this.employeeSource.next(employee);
  }
}
