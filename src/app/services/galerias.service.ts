import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { galerias } from '../models/Galerias';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GaleriasService {

  private url = `${base_url}/galerias`;
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
}
