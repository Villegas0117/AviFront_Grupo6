import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { GaleriasService } from '../../../services/galerias.service';
Chart.register(...registerables)

@Component({
  selector: 'app-reportegaleriaporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportegaleriaporusuario.component.html',
  styleUrl: './reportegaleriaporusuario.component.css'
})
export class ReportegaleriaporusuarioComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private gs: GaleriasService) {}

  ngOnInit(): void {
    this.gs.getcantusaurioporgaleria().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_usuario);
      this.barChartData = [
        {
          data: data.map((item) => item.total_galerias),
          label: 'Total de galerias por usuario',
          backgroundColor: [
            '#445cac',
            '#2e2ca5',
            '#6a79ad',
            '#FF6347',
            '#FF7F50',
            '#CD5C5C',
            '#D2691E',
            '#B22222',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }

}
