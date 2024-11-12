import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {Conjuntos} from '../models/Conjuntos';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ConjuntosService {
  private url = `${base_url}/conjuntos`;
  private listaCambio = new Subject<Conjuntos[]>();

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Conjuntos[]>(this.url);
  }
  insert(c: Conjuntos) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Conjuntos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    //Se pasa por medio de un Path variable el id o el campo necesario para eliminar.
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number){
    return this.http.get<Conjuntos>(`${this.url}/${id}`);
  }
  update(conjun: Conjuntos){
    return this.http.put(this.url,conjun);
  }
  
}
