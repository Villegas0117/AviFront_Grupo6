import { Component } from '@angular/core';
import { RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule,
    RouterLink,
    RouterModule,
  ],
    ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
