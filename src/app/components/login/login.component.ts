import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iLogin } from '../../interfaces/iLogin';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup = this.formBuilder.group({});
  submitted = false; 
  emailChecked = false;
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,        
    private router: Router,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
    ){      
  }

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                   
      Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Correo: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  validarContrasena(control: any) {
    const contrasena = control.value;
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneMinuscula = /[a-z]/.test(contrasena);
    const tieneNumero = /\d/.test(contrasena);

    const esValido = tieneMayuscula && tieneMinuscula && tieneNumero;

    return esValido ? null : { 'contrasenaInvalida': true };
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();          
    this.emailChecked = false;
  }

  onSubmit() {
    this.submitted = true;
    //console.log("Form value ", this.myForm.value);            

    if (this.myForm.valid) {      

      this.employeeService.Login(this.myForm.value).subscribe(
        (response: any) => {
          //console.log('response en el componente ', response);
          this.localStorageService.setData('token', response.token);
          const currentDate = new Date();
          const dateString = currentDate.toISOString();        
          localStorage.setItem('last date', dateString);          
          this.router.navigate(['/employees-get-all']);
        },
        (error: any) => {
          //console.error('Error:', error);
          this.dialog.open(CloseDialogComponent, {            
            data: { message: error } 
          });
        }
      );
    }else{
      this.dialog.open(CloseDialogComponent, {            
        data: { message: "Form validation error" } 
      });
    }
  }

}
