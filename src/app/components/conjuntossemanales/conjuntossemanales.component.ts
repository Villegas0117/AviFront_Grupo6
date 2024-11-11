import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaconjuntossemanalesComponent } from './listaconjuntossemanales/listaconjuntossemanales.component';

@Component({
  selector: 'app-conjuntossemanales',
  standalone: true,
  imports: [RouterOutlet, ListaconjuntossemanalesComponent],
  templateUrl: './conjuntossemanales.component.html',
  styleUrl: './conjuntossemanales.component.css'
})
export class ConjuntossemanalesComponent {
  constructor(public route:ActivatedRoute) {}
}
