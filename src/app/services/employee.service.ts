import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iEmployeeFull } from '../interfaces/iEmployeeFull';
import { iEmployee } from '../interfaces/iEmployee';
import { catchError } from 'rxjs/operators';
import { iLogin } from '../../app/interfaces/iLogin';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  private readonly TOKEN_EXPIRY_MINUTES = 20;
  private apiUrl = 'https://localhost:7261/api'; 

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
    ) { }

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

  exportEmployeesToCsv() {
    // Llama al endpoint y especifica que la respuesta es un blob (archivo binario)
    return this.http.get(`${this.apiUrl}/Employees/ExportEmployeesToCsv`, { responseType: 'blob' });
  }

  IsAuthenticated(): boolean {
    const token = this.sessionStorageService.getData('token');

    if (!token) {
      // No hay token, no autenticado
      return false; 
    }
    
    if (this.isTokenExpired(token)) {
      return false; 
    }

    // Token válido
    return true; 
  }  

  private isTokenExpired(token: string): boolean {
    try {      
      const payload = JSON.parse(atob(token.split('.')[1])); 
      const expiry = payload.exp; 
      // Hora actual en segundos
      const currentTime = Math.floor((new Date).getTime() / 1000); 
      // Comprobar si el token ha expirado
      return currentTime >= expiry; 
    } catch (e) {
      console.error("Error parsing token payload:", e);          
      // Considerar token como expirado si no se puede parsear
      return true; 
    }
  }

  Login(login: iLogin): Observable<any> {      
    //console.log("En el servicio ", login);   
    return this.http.post(`${this.apiUrl}/Employees/Login`, login).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }
}
