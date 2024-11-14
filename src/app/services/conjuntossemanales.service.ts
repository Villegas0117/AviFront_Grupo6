import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { ConjuntoSemanal } from '../models/Conjuntos_semanales';
import { HttpClient } from '@angular/common/http';
import { ConjuntoPorUsuarioDTO } from '../models/ConjuntoPorUsuarioDTO';
import { ConjuntoDiaSemanaDTO } from '../models/ConjuntoDiaSemanaDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConjuntossemanalesService {

  private url = `${base_url}/conjunto-semanal`; 
  private listaCambio = new Subject<ConjuntoSemanal[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<ConjuntoSemanal[]>(this.url);
  }
  insert(c: ConjuntoSemanal) {
    return this.http.post(this.url, c);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: ConjuntoSemanal[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ConjuntoSemanal>(`${this.url}/${id}`);
  }

  update(co: ConjuntoSemanal) {
    return this.http.put(this.url, co);
  }
  getconjuntoporusuario(): Observable<ConjuntoPorUsuarioDTO[]> {
    return this.http.get<ConjuntoPorUsuarioDTO[]>(`${this.url}/conjuntosporusuariosemanal`);
  }
  getconjuntodia(): Observable<ConjuntoDiaSemanaDTO[]> {
    return this.http.get<ConjuntoDiaSemanaDTO[]>(`${this.url}/conjuntospordiasemanal`);
  }

 

}
