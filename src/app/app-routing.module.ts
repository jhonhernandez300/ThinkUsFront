import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGetAllComponent } from '../app/components/employee-get-all/employee-get-all.component';
import { EmployeeSaveComponent } from '../app/components/employee-save/employee-save.component';
import { EmployeeUpdateComponent } from '../app/components/employee-update/employee-update.component';
import { LoginComponent } from '../app/components/login/login.component';
import { authguardGuard } from '../app/helpers/authguard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee-update', component: EmployeeUpdateComponent, canActivate: [authguardGuard] },
  { path: 'employee-save', component: EmployeeSaveComponent, canActivate: [authguardGuard] },
  { path: 'employees-get-all', component: EmployeeGetAllComponent, canActivate: [authguardGuard] },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
