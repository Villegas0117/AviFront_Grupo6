import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRecomendacionesComponent } from './listar-recomendaciones/listar-recomendaciones.component';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [RouterOutlet, ListarRecomendacionesComponent],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {
  constructor(public route:ActivatedRoute){

  }

}
