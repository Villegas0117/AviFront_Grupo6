import { Injectable } from '@angular/core';
import { environment} from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {Usuarios} from '../models/Usuarios';
import { Subject } from 'rxjs';



const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private  listaCambio = new Subject<Usuarios[]>();

  constructor(private http: HttpClient, ) { }
  list(){
    return this.http.get<Usuarios[]>(this.url);
  }
  insert(u: Usuarios){
    return this.http.post(this.url,u);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva : Usuarios[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id: number){
    return this.http.get<Usuarios>(`${this.url}/${id}`);
  }

  delete(id:  number){  
    return this.http.delete(`${this.url}/${id}`);
  }

  update(us : Usuarios){
    return this.http.put(this.url,us);
  }
}
