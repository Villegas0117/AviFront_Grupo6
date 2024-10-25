import { Component } from '@angular/core';
import { ListarrolesComponent } from "./listarroles/listarroles.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ListarrolesComponent, RouterOutlet],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  constructor(public route:ActivatedRoute){}
}
