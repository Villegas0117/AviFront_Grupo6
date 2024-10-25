import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarprendasComponent } from './listarprendas/listarprendas.component';

@Component({
  selector: 'app-prendas',
  standalone: true,
  imports: [RouterOutlet,ListarprendasComponent],
  templateUrl: './prendas.component.html',
  styleUrl: './prendas.component.css'
})
export class PrendasComponent {
  constructor(public route:ActivatedRoute) {}

}
