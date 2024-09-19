import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const employeeService = inject(EmployeeService);
  const router = inject(Router);
  
  if (employeeService.IsAuthenticated()) {
    //console.log(employeeService.IsAuthenticated());
    return true;
  } else {    
    return router.createUrlTree(['/login']); 
  }
};
