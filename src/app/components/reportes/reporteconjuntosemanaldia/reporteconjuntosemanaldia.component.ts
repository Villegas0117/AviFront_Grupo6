import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConjuntossemanalesService } from '../../../services/conjuntossemanales.service';


Chart.register(...registerables)
@Component({
  selector: 'app-reporteconjuntosemanaldia',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteconjuntosemanaldia.component.html',
  styleUrl: './reporteconjuntosemanaldia.component.css'
})
export class ReporteconjuntosemanaldiaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private csS: ConjuntossemanalesService) {}

  ngOnInit(): void {
    this.csS.getconjuntodia().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreconjunto);
      this.barChartData = [
        {
          data: data.map((item) => item.totalDias),
          label: 'Total de dias semanales por conjunto semanal',
          backgroundColor: [
            '#2B2D42',
            '#8D99AE',
            '#EDF2F4',
            '#EF233C',
            '#D90429',
            '#8D6E63',
            '#C3B091',
            '#FF33CC',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
