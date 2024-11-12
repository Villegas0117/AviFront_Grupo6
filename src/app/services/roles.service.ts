import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/Roles';
import { Subject } from 'rxjs';

//llamar la url de localhost (api)
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
// declarar variable para la coonsulta (debo verificar ruta en controladores de backend (ruta del back))
  private url =  `${base_url}/roles`;
  private  listaCambio = new Subject<Roles[]>();
constructor(private http: HttpClient) { }
//hacer perición con el http client
  list(){
    return this.http.get<Roles[]>(this.url);
  }
  insert(r: Roles){
    return this.http.post(this.url,r);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva : Roles[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id: number){
    return this.http.get<Roles>(`${this.url}/${id}`);
  }

  delete(id:  number){  
    return this.http.delete(`${this.url}/${id}`);
  }

  update(r : Roles){
    return this.http.put(this.url,r);
  }
}

