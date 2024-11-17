import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { galerias } from '../models/Galerias';
import { GaleriaTotalUsuarioDTO } from '../models/GaleriaTotalUsuarioDTO';
import { GaleriaUserDTO } from '../models/GaleriaUserDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GaleriasService {

  private url = `${base_url}/(/galerias`;
  private listaCambio = new Subject<galerias[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<galerias[]>(this.url);
  }
  insert(m: galerias) {
    return this.http.post(this.url, m);
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
  getcantusaurioporgaleria(): Observable<GaleriaTotalUsuarioDTO[]> {
    return this.http.get<GaleriaTotalUsuarioDTO[]>(`${this.url}/galeríaPorUsuario`);
  }
  getfechagaleria(): Observable<GaleriaUserDTO[]> {
    return this.http.get<GaleriaUserDTO[]>(`${this.url}/galeríaReciente`);
  }
}
