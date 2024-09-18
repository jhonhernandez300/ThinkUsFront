import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iEmployeeFull } from '../interfaces/iEmployeeFull';
import { iEmployee } from '../interfaces/iEmployee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  lastDate: any;  
  fechaHoraActual: Date = new Date();  
  private apiUrl = 'https://localhost:7261/api'; 

  constructor(private http: HttpClient) { }

  UpdateEmployee(employee: iEmployee): Observable<any> {    
    console.log("En el servicio ", employee);     
    return this.http.put(`${this.apiUrl}/Turno/ActualizarTurno`, employee).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }

  CreateEmployee(employee: iEmployeeFull): Observable<any> {         
    console.log(employee);
    return this.http.post(`${this.apiUrl}/Employees/CreateEmployee`, employee).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }

  DeleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Employees/DeleteEmployee/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting the employee:', error);
        return throwError(error);
      })
    );
  }

  GetEmployees(): Observable<any> {         
    return this.http.get(`${this.apiUrl}/Employees/GetAllEmployees`).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }

  IsAuthenticated(): boolean{  
    const lastDate = localStorage.getItem('last date');      
    //console.log("lastDate ", lastDate);

    if (lastDate === null) {   
      this.lastDate = new Date(1900, 0, 1, 0, 0, 0); 
    }else {
      this.lastDate = new Date(lastDate);
    }  
  
    const fechaHoraActual = new Date();
    const diferenciaMs = this.lastDate.getTime() - this.fechaHoraActual.getTime(); 
       
      // Convertir la diferencia de milisegundos a minutos
    const diferenciaMinutos = diferenciaMs / (1000 * 60);  
    //console.log("(-1 * diferenciaMinutos) ", (-1 * diferenciaMinutos));
      // Comprobar si la diferencia es mayor a 20 minutos
    if((-1 * diferenciaMinutos) > 20)  {
      return false;
    }else{
      return true;
    }   
  }

  // Login(usuarioCorto: iUsuarioCorto): Observable<any> {         
  //   return this.http.post(`${this.apiUrl}/Usuario/Login`, usuarioCorto).pipe(
  //     catchError(error => {
  //         console.error('Error en la solicitud:', error);
  //         return throwError(error);
  //     })    
  //   );    
  // }
}
