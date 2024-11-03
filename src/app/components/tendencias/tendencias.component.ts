import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartendenciasComponent } from './listartendencias/listartendencias.component';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [RouterOutlet,ListartendenciasComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent {
  constructor(public route:ActivatedRoute){}
}
