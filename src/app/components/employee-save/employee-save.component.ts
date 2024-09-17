import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { iEmployeeFull } from '../../interfaces/iEmployeeFull';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { RolesService } from '../../services/roles.service';
import { iRoles } from '../../interfaces/iRoles';

@Component({
  selector: 'app-employee-save',
  templateUrl: './employee-save.component.html',
  styleUrl: './employee-save.component.css'
})
export class EmployeeSaveComponent implements OnInit{
  myForm!: FormGroup; 
  submitted = false;
  selectedRoleId!: number;
  roles: iRoles[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog,
    private rolesService: RolesService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.rolesService.GetAllRoles().subscribe({
      next: (response: any) => {
          //console.log('response', response);
          this.roles = response.roles;
      },
      error: (error: any) => {
          console.error('Request error:', error);
          // Maneja el error aquí
      }
  });
}

onRoleChange(event: any): void {
  this.selectedRoleId = event.value; 
    //console.log('Selected role ID:', this.selectedRoleId);
    this.myForm.patchValue({ RolId: this.selectedRoleId });
}

  private initializeForm(): void {
    this.myForm = this.formBuilder.group({                                
      Id: [0],
      EmployeeName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/), Validators.minLength(5), Validators.maxLength(30)]],
      EmployeeDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      EmployeeState: [true, ],                    
      EmployeePassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.validarContrasena 
      ]],
      RolId: ['', [Validators.required]]
    });
  }

  public onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  public async onSubmit(): Promise<void> {
    this.submitted = true;
    //console.log("Form value ", this.myForm.value);        

    if (this.myForm.invalid) {
      console.log('Error de validación')          
      return
    }             
    
    this.employeeService.CreateEmployee(this.myForm.value).subscribe({
      next: (response: any) => {
          console.log('response', response);
          // Maneja la respuesta exitosa aquí
      },
      error: (error: any) => {
          console.error('Request error:', error);
          // Maneja el error aquí
      }
  });     
  }

  validarContrasena(control: any) {
    const contrasena = control.value;
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneMinuscula = /[a-z]/.test(contrasena);
    const tieneNumero = /\d/.test(contrasena);

    const esValido = tieneMayuscula && tieneMinuscula && tieneNumero;
    //console.log("Contraseña esValido ", esValido);
    return esValido ? null : { 'contrasenaInvalida': true };
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }
}
