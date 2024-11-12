import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { CreareditarusuariosComponent } from './components/usuarios/creareditarusuarios/creareditarusuarios.component';
import { CreareditarrolesComponent } from './components/roles/creareditarroles/creareditarroles.component';

export const routes: Routes = [
      {
            path:'usuarios', component: UsuariosComponent,
            children:[
                  {
                        path:'nuevo', component: CreareditarusuariosComponent
                  },
                  {
                        path: 'edicionUsuario/:id', component: CreareditarusuariosComponent
                  }
            ]
      },
      {
            path: 'roles', component: RolesComponent,
            children:[
                  {
                        path:'nuevo', component: CreareditarrolesComponent
                  },
                  {
                        path: 'edicionesRoles/:id', component :CreareditarrolesComponent
                  }
            ]
      },
      {
            path: 'prendas', component: PrendasComponent,
      },
      {
            path: 'conjuntos', component: ConjuntosComponent,
      }
];
