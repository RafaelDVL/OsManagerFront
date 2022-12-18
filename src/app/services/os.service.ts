import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OS } from '../Models/OS';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: string = environment.apiUrl;

  constructor(private http : HttpClient,
      private snackBar: MatSnackBar) { }

  findAll():Observable<OS[]>{
    const url = this.baseUrl + "/os";
    return this.http.get<OS[]>(url);
  }

  create(os: OS):Observable<OS>{
    const url = this.baseUrl + "/os";
    return this.http.post<OS>(url, os);
  }

  update(os: OS, id: any):Observable<OS>{
    const url = this.baseUrl + "/os" + id;
    console.log(os);
    return this.http.put<OS>(url, os);
  }

  findByID(id: any):Observable<OS>{
    const url = this.baseUrl + "/os/"+ id;
    return this.http.get<OS>(url);
  }


  delete(id: any):Observable<void>{
    const url = this.baseUrl + "/os/" + id;
    return this.http.delete<void>(url);
  }

  openSnackBar(message: string):void {
    this.snackBar.open(`${message}`, "OK",
      {duration: 3000}
    )
}
}
