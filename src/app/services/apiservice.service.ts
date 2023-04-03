import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private http: HttpClient) { }
  post<T>(url: string, body: any, option?: any): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http
      .post(url, body, { ...option, headers: headers })
      .pipe(catchError(this.handleErrorPassthrough(`POST: ${url}`)));
  }

  private handleErrorPassthrough(operation = 'operation') {
    return (error: any): Observable<any> => {
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
  private log(message: string): void {
  }
}
