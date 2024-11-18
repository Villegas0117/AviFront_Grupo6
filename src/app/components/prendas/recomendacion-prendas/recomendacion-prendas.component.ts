import { PrendasService } from './../../../services/prendas.service';
import { ClimaService } from './../../../services/clima.service';
import { Component, OnInit } from '@angular/core';
import { Prendas } from '../../../models/Prendas';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recomendacion-prendas',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './recomendacion-prendas.component.html',
  styleUrl: './recomendacion-prendas.component.css',
})
export class RecomendacionPrendasComponent implements OnInit {
  prendasRecomendadas: Prendas[] = [];
  temperaturaActual: number = 0;

  constructor(
    private ClimaService: ClimaService,
    private PrendasService: PrendasService
  ) {}

  ngOnInit(): void {
    // Usar coordenadas de Lima (aproximadas)
    const lat = -12.0464; // Latitud de Lima
    const lon = -77.0428; // Longitud de Lima

    // Obtener la temperatura actual
    this.ClimaService.obtenerTemperaturaPorCoordenadas(lat, lon).subscribe(
      (temp) => {
        this.temperaturaActual = temp;
        console.log('Temperatura actual en Lima:', this.temperaturaActual);

        // Obtener todas las prendas y filtrar según la temperatura
        this.PrendasService.list().subscribe((prendas) => {
          this.prendasRecomendadas = this.filtrarPrendasPorTemperatura(prendas);
        });
      }
    );
  }

  filtrarPrendasPorTemperatura(prendas: Prendas[]): Prendas[] {
    if (this.temperaturaActual <= 15) {
      // Frío
      return prendas.filter(
        (prenda) =>
          prenda.tipo_prenda === 'Suéter' ||
          prenda.tipo_prenda === 'Chaqueta' ||
          prenda.tipo_prenda === 'Botas'
      );
    } else if (this.temperaturaActual > 15 && this.temperaturaActual <= 25) {
      // Templado
      return prendas.filter(
        (prenda) =>
          prenda.tipo_prenda === 'Polo' ||
          prenda.tipo_prenda === 'Pantalón' ||
          prenda.tipo_prenda === 'Zapatillas'
      );
    } else {
      // Calor
      return prendas.filter(
        (prenda) =>
          prenda.tipo_prenda === 'Playera' ||
          prenda.tipo_prenda === 'Shorts' ||
          prenda.tipo_prenda === 'Sandalias'
      );
    }
  }
}
