import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportegaleriaporusuarioComponent } from './reportegaleriaporusuario/reportegaleriaporusuario.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportegaleriaporusuarioComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}
}
