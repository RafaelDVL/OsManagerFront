import { Cliente } from './../Models/cliente';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) {}

    findAll(): Observable<Cliente[]>{
      const url = this.baseUrl + "/clientes";
      return this.http.get<Cliente[]>(url);
    }

    create(cliente: Cliente):Observable<Cliente>{
      const url = this.baseUrl + "/clientes";
      return this.http.post<Cliente>(url, cliente);
    }

    update(cliente: Cliente, id: any):Observable<Cliente>{
      const url = this.baseUrl + "/clientes/" + id;
      return this.http.put<Cliente>(url, cliente);
    }

    findByID(id: any):Observable<Cliente>{
      const url = this.baseUrl + "/clientes/"+ id;
      return this.http.get<Cliente>(url);
    }


    delete(id: any):Observable<void>{
      const url = this.baseUrl + "/clientes/" + id;
      return this.http.delete<void>(url);
    }

    openSnackBar(message: string):void {
      this.snackBar.open(`${message}`, "OK",
        {duration: 3000}
      )
  }

  }
