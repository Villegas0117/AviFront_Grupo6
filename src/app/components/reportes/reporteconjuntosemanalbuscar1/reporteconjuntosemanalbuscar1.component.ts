import { Component, OnInit, ViewChild } from '@angular/core';
import { ConjuntoSemanal } from '../../../models/Conjuntos_semanales';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConjuntossemanalesService } from '../../../services/conjuntossemanales.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-reporteconjuntosemanalbuscar1',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteconjuntosemanalbuscar1.component.html',
  styleUrl: './reporteconjuntosemanalbuscar1.component.css'
})
export class Reporteconjuntosemanalbuscar1Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private csS: ConjuntossemanalesService) {}

  ngOnInit(): void {
    this.csS.getconjuntoporusuario().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.total_conjuntos),
          label: 'Total de conjuntos semanales por usuario',
          backgroundColor: [
            '#A8DADC',
            '#457B9D',
            '#F4A261',
            '#E76F51',
            '#FFE8D6',
            '#FF6F61',
            '#7FFF00',
            '#4AFFEF',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
