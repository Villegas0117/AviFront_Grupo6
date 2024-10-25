import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarconjuntosComponent } from './listarconjuntos/listarconjuntos.component';

@Component({
  selector: 'app-conjuntos',
  standalone: true,
  imports: [RouterOutlet,ListarconjuntosComponent],
  templateUrl: './conjuntos.component.html',
  styleUrl: './conjuntos.component.css'
})
export class ConjuntosComponent {
  constructor(public route:ActivatedRoute){}

}
 