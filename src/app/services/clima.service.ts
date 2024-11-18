import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrendasService } from './prendas.service';
import { map, Observable } from 'rxjs';
import { Prendas } from '../models/Prendas';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = 'ee51353d9581b769774248959b7270d3';
  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather'; 
  temperaturaActual: number = 0;

  constructor(private http: HttpClient, private prendasService: PrendasService) {}

  obtenerTemperaturaPorCoordenadas(lat: number, lon: number): Observable<number> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        this.temperaturaActual = response.main.temp;
        return this.temperaturaActual;
      })
    );
  }

  obtenerPrendasRecomendadas(): Observable<Prendas[]> {
    // Obtener la lista de prendas desde PrendasService
    return this.prendasService.list().pipe(
      map(prendas => {
        if (this.temperaturaActual <= 15) {
          // Frío
          return prendas.filter(prenda => 
            prenda.tipo_prenda === 'Suéter' || 
            prenda.tipo_prenda === 'Chaqueta' || 
            prenda.tipo_prenda === 'Botas'
          );
        } else if (this.temperaturaActual > 15 && this.temperaturaActual <= 25) {
          // Templado
          return prendas.filter(prenda => 
            prenda.tipo_prenda === 'Polo' || 
            prenda.tipo_prenda === 'Pantalón' || 
            prenda.tipo_prenda === 'Zapatillas'
          );
        } else {
          // Calor
          return prendas.filter(prenda => 
            prenda.tipo_prenda === 'Playera' || 
            prenda.tipo_prenda === 'Shorts' || 
            prenda.tipo_prenda === 'Sandalias'
          );
        }
      })
    );
  }
}

