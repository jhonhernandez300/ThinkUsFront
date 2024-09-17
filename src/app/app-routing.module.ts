import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGetAllComponent } from '../app/components/employee-get-all/employee-get-all.component';
import { EmployeeSaveComponent } from '../app/components/employee-save/employee-save.component';

const routes: Routes = [
  { path: 'employee-save', component: EmployeeSaveComponent },
  { path: 'employees-get-all', component: EmployeeGetAllComponent },
  { path: '**', component: EmployeeGetAllComponent },
  { path: '', component: EmployeeGetAllComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
