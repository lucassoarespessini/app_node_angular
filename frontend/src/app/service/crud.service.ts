import { Injectable } from '@angular/core';
import { Produto } from './Produto';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'http://' + environment.LOCAL_HOST + ':' + environment.LOCAL_PORT;
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  // Add
  AddProduto(data: Produto): Observable<any> {
    let API_URL = `${this.REST_API}/add-produto`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  // Get all objects
  GetProdutos() {
    return this.httpClient.get(`${this.REST_API}/produtos`);
  }
  GetVisiveisProdutos() {
    return this.httpClient.get(`${this.REST_API}/produtos-visiveis`);
  }
  // Get single object
  GetProduto(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-produto/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }
  // Update
  updateProduto(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-produto/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // Delete
  deleteProduto(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-produto/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}