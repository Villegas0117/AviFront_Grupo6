import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { RecomendacionesPorIntervaloDTO } from '../../../models/RecomendacionesPorIntervaloDTO';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-recomendacionesxintervalo',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './recomendacionesxintervalo.component.html',
  styleUrls: ['./recomendacionesxintervalo.component.css'],
})
export class RecomendacionesxintervaloComponent  {
  // Gráfico
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = []; // Etiquetas de fechas
  barChartType: ChartType = 'bar'; // Cambia a 'line', 'doughnut', etc., si es necesario
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  totalRecomendaciones: number | null = null;
  error: string | null = null;

  constructor(private recomendacionesService: RecomendacionesService) {}

  obtenerReporte(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.error = 'Por favor, ingresa ambas fechas.';
      return;
    }

    this.recomendacionesService.getTotalRecomendacionesPorIntervalo(this.fechaInicio, this.fechaFin).subscribe(
      (data) => {
        this.totalRecomendaciones = data.totalRecomendaciones;
        this.error = null; // Limpia cualquier error anterior
      },
      (err) => {
        this.error = 'Error al obtener los datos. Por favor, verifica las fechas o intenta más tarde.';
        this.totalRecomendaciones = null;
        console.error(err);
      }
    );
  }
}

