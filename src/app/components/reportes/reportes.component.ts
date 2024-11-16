import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecomendacionesxintervaloComponent } from './recomendacionesxintervalo/recomendacionesxintervalo.component';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, RecomendacionesxintervaloComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}

}
