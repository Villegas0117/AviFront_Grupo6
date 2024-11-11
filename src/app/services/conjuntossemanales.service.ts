import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { conjunto_dia } from '../models/Conjuntos_semanales';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConjuntossemanalesService {

  private url = `${base_url}/conjunto-semanal`; 
  private listaCambio = new Subject<conjunto_dia[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<conjunto_dia[]>(this.url);
  }
  insert(c: conjunto_dia) {
    return this.http.post(this.url, c);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: conjunto_dia[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<conjunto_dia>(`${this.url}/${id}`);
  }

  update(co: conjunto_dia) {
    return this.http.put(this.url, co);
  }
}
