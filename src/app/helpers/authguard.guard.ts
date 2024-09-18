import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authguardGuard: CanActivateFn = (  
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {   
  if(inject(EmployeeService).IsAuthenticated()){
    return true;
  }else {
    inject(Router).navigate(['/login']);
    return false;
  }
}; 