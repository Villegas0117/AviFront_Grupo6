import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ReTendenciasConMasRecomendacionesDTO } from '../../../models/ReTendenciasConMasRecomendacionesDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-tendenciasconmasrecomendaciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './tendenciasconmasrecomendaciones.component.html',
  styleUrl: './tendenciasconmasrecomendaciones.component.css'
})
export class TendenciasconmasrecomendacionesComponent implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private recomendacionesService: RecomendacionesService) {}

  ngOnInit(): void {
    const topN = 5;
    this.recomendacionesService.getTopTendenciasConMasRecomendaciones(topN).subscribe((data: ReTendenciasConMasRecomendacionesDTO[]) => {
      this.barChartLabels = data.map((trend) => trend.nombre_tendencia);
      this.barChartData = [
        {
          data: data.map((trend) => trend.total_recomendaciones),
          label: 'Total de Recomendaciones',
          backgroundColor: ['#f8b400', '#3cb371', '#6495ed', '#ff6347', '#4682b4'],
        },
      ];
    });
  }
}