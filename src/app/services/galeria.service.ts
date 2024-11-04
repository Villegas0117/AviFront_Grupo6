import { Injectable } from '@angular/core';
import { Galerias } from '../models/Galerias';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private url = `${base_url}/galerias`; /*ver el cors del intellig*/
  private listaCambio = new Subject<Galerias[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Galerias[]>(this.url);
  }
  insert(g: Galerias) {
    return this.http.post(this.url, g);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Galerias[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Galerias>(`${this.url}/${id}`);
  }

  update(ga: Galerias) {
    return this.http.put(this.url, ga);
  }
}
