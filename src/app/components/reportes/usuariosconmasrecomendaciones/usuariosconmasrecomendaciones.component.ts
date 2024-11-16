import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ReUsuariosConMasRecomendacionesDTO } from '../../../models/ReUsuariosConMasRecomendacionesDTO';
@Component({
  selector: 'app-usuariosconmasrecomendaciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './usuariosconmasrecomendaciones.component.html',
  styleUrl: './usuariosconmasrecomendaciones.component.css'
})
export class UsuariosconmasrecomendacionesComponent implements OnInit{
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RecomendacionesService) {}

  ngOnInit(): void {
    const topN = 5;
    this.rS.getTopUsuariosConMasRecomendaciones(topN).subscribe((data: ReUsuariosConMasRecomendacionesDTO[]) => {
      this.barChartLabels = data.map((user) => user.nombre_usuario);
      this.barChartData = [
        {
          data: data.map((user) => user.total_recomendaciones),
          label: 'Total de Recomendaciones',
          backgroundColor: '#ffa600',
        },
      ];
    });
  }
}