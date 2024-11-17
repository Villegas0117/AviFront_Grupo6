import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { ReTendenciasConMasRecomendacionesDTO } from '../../../models/ReTendenciasConMasRecomendacionesDTO';
Chart.register(...registerables);

@Component({
  selector: 'app-tendenciasconmasrecomendaciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './tendenciasconmasrecomendaciones.component.html',
  styleUrls: ['./tendenciasconmasrecomendaciones.component.css']
})
export class TendenciasconmasrecomendacionesComponent implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut'; // Tipo de gráfico modificado a 'doughnut'
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  topN: number = 5; // Valor por defecto para las tendencias

  constructor(private recomendacionesService: RecomendacionesService) {}

  ngOnInit(): void {
    this.loadTopTendencias();
  }

  loadTopTendencias(): void {
    this.recomendacionesService.getTopTendenciasConMasRecomendaciones(this.topN).subscribe(
      (data: ReTendenciasConMasRecomendacionesDTO[]) => {
        this.barChartLabels = data.map(trend => {
          return trend.nombre_tendencia;
        });
        this.barChartData = [
          {
            data: data.map(trend => trend.total_recomendaciones),
            label: 'Total de Recomendaciones',
            backgroundColor: ['#f8b400', '#3cb371', '#6495ed', '#ff6347', '#4682b4'],
            borderColor: '#000',
            borderWidth: 1,
          },
        ];
      },
      (error) => {
        console.error('Error al obtener tendencias:', error);
      }
    );
  }
  
}