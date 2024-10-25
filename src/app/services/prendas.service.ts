import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Prendas } from '../models/Prendas';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PrendasService {
  private url = `${base_url}/prendas`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Prendas[]>(this.url);
  }
}
