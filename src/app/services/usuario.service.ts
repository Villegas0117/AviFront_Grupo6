import { Injectable } from '@angular/core';
import { environment} from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {Usuarios} from '../models/Usuarios';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;

  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Usuarios[]>(this.url);
  }
}
