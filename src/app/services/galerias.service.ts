import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Galerias } from '../models/Galerias';

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
}
