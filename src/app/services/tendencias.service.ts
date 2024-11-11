import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tendencia } from '../models/Tendencia';

//llamar la url de localhost (api)
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TendenciasService {
// declarar variable para la coonsulta (debo verificar ruta en controladores de backend (ruta del back))
  private url =  `${base_url}/tendencias`;
  private listaCambio = new Subject<Tendencia[]>();

  
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Tendencia[]>(this.url);
  }
  insert(v: Tendencia) {
    return this.http.post(this.url, v);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Tendencia[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Tendencia>(`${this.url}/${id}`);
  }

  update(teh: Tendencia) {
    return this.http.put(this.url, teh);
  }
}

