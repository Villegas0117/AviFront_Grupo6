import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Galerias } from '../models/Galerias';
import { Observable, Subject } from 'rxjs';
import { GaleriaTotalUsuarioDTO } from '../models/GaleriaTotalUsuarioDTO';
import { GaleriaUserDTO } from '../models/GaleriaUserDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GaleriasService {

  private url = `${base_url}/(/galerias`;
  private listaCambio = new Subject<Galerias[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Galerias[]>(this.url);
  }
  insert(m: Galerias) {
    return this.http.post(this.url, m);
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
  listId(id: number){
    return this.http.get<Galerias>(`${this.url}/${id}`);
  }
  update(pren: Galerias){
    return this.http.put(this.url,pren);
  }
  getcantusaurioporgaleria(): Observable<GaleriaTotalUsuarioDTO[]> {
    return this.http.get<GaleriaTotalUsuarioDTO[]>(`${this.url}/galeríaPorUsuario`);
  }
  getfechagaleria(): Observable<GaleriaUserDTO[]> {
    return this.http.get<GaleriaUserDTO[]>(`${this.url}/galeríaReciente`);
  }
}
