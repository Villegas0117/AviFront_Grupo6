import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Recomendaciones } from '../models/Recomendaciones';
import { Subject } from 'rxjs';
//llamar la url de localhost (api)
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
// declarar variable para la coonsulta (debo verificar ruta en controladores de backend (ruta del back))
  private url =  `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendaciones[]>();

  constructor(private http: HttpClient) { }

//hacer perición con el http client
  list(){
    return this.http.get<Recomendaciones[]>(this.url);
  }
  insert(r: Recomendaciones) {
    return this.http.post(this.url, r);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Recomendaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Recomendaciones>(`${this.url}/${id}`);
  }

  update(reh: Recomendaciones) {
    return this.http.put(this.url, reh);
  }
}

