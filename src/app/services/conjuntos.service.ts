import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {Conjuntos} from '../models/Conjuntos';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ConjuntosService {
  private url = `${base_url}/conjuntos`
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Conjuntos[]>(this.url);
  }
}
