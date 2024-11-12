import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Prendas } from '../models/Prendas';
import { Subject, Observable } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PrendasService {
  private url = `${base_url}/prendas`;
  private listaCambio = new Subject<Prendas[]>();

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Prendas[]>(this.url);
  }
  insert(p: Prendas) {
    return this.http.post(this.url, p);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Prendas[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    //Se pasa por medio de un Path variable el id o el campo necesario para eliminar.
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number){
    return this.http.get<Prendas>(`${this.url}/${id}`);
  }
  update(pren: Prendas){
    return this.http.put(this.url,pren);
  }

}
