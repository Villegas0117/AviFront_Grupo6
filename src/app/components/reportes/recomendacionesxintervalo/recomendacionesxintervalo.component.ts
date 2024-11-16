import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { RecomendacionesPorIntervaloDTO } from '../../../models/RecomendacionesPorIntervaloDTO';
Chart.register(...registerables);
@Component({
  selector: 'app-recomendacionesxintervalo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recomendacionesxintervalo.component.html',
  styleUrl: './recomendacionesxintervalo.component.css'
})
export class RecomendacionesxintervaloComponent implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = ['Total Recomendaciones'];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RecomendacionesService) {}

  ngOnInit(): void {
    const fechaInicio = new Date(2023, 0, 1);
    const fechaFin = new Date(2023, 11, 31);
    
    this.rS.getRecomendacionesPorIntervalo(fechaInicio, fechaFin).subscribe((data: RecomendacionesPorIntervaloDTO) => {
      this.barChartLabels = [`Desde ${data.fechaInicio} hasta ${data.fechaFin}`];
      this.barChartData = [
        {
          data: [data.totalRecomendaciones],
          label: 'Total de Recomendaciones',
          backgroundColor: '#3e95cd',
        },
      ];
    });
  }
}
