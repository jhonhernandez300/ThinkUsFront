import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iRoles } from '../interfaces/iRoles';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService { 
  private apiUrl = 'https://localhost:7261/api'; 

  constructor(private http: HttpClient) { }

  GetAllRoles(): Observable<any> {         
    return this.http.get(`${this.apiUrl}/Roles/GetAllRoles`).pipe(
      catchError(error => {
          console.error('Request error :', error);
          return throwError(error);
      })    
    );    
  }
}
