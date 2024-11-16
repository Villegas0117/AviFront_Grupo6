import { Injectable } from '@angular/core';
import { galerias } from '../models/Galerias';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private url = `${base_url}/galerias`; 
  private listaCambio = new Subject<galerias[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<galerias[]>(this.url);
  }
  insert(g: galerias) {
    return this.http.post(this.url, g);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: galerias[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<galerias>(`${this.url}/${id}`);
  }

  update(ga: galerias) {
    return this.http.put(this.url, ga);
  }
}
