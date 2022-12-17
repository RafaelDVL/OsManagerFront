import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tecnico } from '../Models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.apiUrl;

  constructor(private http : HttpClient,
      private snackBar: MatSnackBar) { }

  findAll():Observable<Tecnico[]>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  create(tecnico: Tecnico):Observable<Tecnico>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url, tecnico);
  }

  update(tecnico: Tecnico, id: any):Observable<Tecnico>{
    const url = this.baseUrl + "/tecnicos/" + id;
    return this.http.put<Tecnico>(url, tecnico);
  }

  findByID(id: any):Observable<Tecnico>{
    const url = this.baseUrl + "/tecnicos/"+ id;
    return this.http.get<Tecnico>(url);
  }


  delete(id: any):Observable<void>{
    const url = this.baseUrl + "/tecnicos/" + id;
    return this.http.delete<void>(url);
  }

  openSnackBar(message: string):void {
    this.snackBar.open(`${message}`, "OK",
      {duration: 3000}
    )
}
}
