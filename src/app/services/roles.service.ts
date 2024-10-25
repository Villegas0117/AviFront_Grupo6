import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/Roles';

//llamar la url de localhost (api)
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
// declarar variable para la coonsulta (debo verificar ruta en controladores de backend (ruta del back))
  private url =  `${base_url}/roles`;

  
constructor(private http: HttpClient) { }
//hacer perición con el http client
  list(){
    return this.http.get<Roles[]>(this.url);
  }
}

