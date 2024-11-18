import { Component, OnInit } from '@angular/core';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { ReUsuariosConMasRecomendacionesDTO } from '../../../models/ReUsuariosConMasRecomendacionesDTO';
Chart.register(...registerables)

@Component({
  selector: 'app-usuariosconmasrecomendaciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './usuariosconmasrecomendaciones.component.html',
  styleUrls: ['./usuariosconmasrecomendaciones.component.css']
})
export class UsuariosconmasrecomendacionesComponent implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  topN: number = 6; // Valor por defecto

  constructor(private recomendacionesService: RecomendacionesService) {}

  ngOnInit(): void {
    this.loadTopUsuarios();
  }

  loadTopUsuarios(): void {
    this.recomendacionesService.getTopUsuariosConMasRecomendaciones(this.topN).subscribe(
      (data: ReUsuariosConMasRecomendacionesDTO[]) => {
        this.barChartLabels = ['Usuarios']; // Etiqueta general única para el eje X
  
        this.barChartData = data.map((user, index) => ({
          data: [user.total_recomendaciones], // Cada conjunto de datos representa un usuario
          label: user.nombre_usuario,        // El nombre del usuario aparece en la leyenda
          backgroundColor: this.getColor(index), // Colores personalizados para cada usuario
          borderColor: '#000',
          borderWidth: 1,
        }));
      },
      (error) => {
        console.error('Error al obtener recomendaciones:', error);
      }
    );
  }
  
  private getColor(index: number): string {
    const colors = ['#f8b400', '#3cb371', '#6495ed', '#ff6347', '#4682b4', '#9370db', '#ffa07a'];
    return colors[index % colors.length]; // Asignar colores en bucle si hay más usuarios que colores
  }
  

}