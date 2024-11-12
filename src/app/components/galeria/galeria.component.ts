import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListargaleriaComponent } from './listargaleria/listargaleria.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [RouterOutlet, ListargaleriaComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  constructor(public route:ActivatedRoute) {}
}
