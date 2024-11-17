import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(private http: HttpClient) {}
  login(request: JwtRequest) {
    return this.http.post('https://aaw-grupo6-60nk.onrender.com/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    //Console Log
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
