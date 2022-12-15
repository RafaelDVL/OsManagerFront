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

  openSnackBar(message: string):void {
    this.snackBar.open(`${message}`, "OK",
      {duration: 3000}
    )
}
}
