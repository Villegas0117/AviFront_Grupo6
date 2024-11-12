import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { CreareditarconjuntoComponent } from './components/conjuntos/creareditarconjunto/creareditarconjunto.component';
import { CreareditarprendasComponent } from './components/prendas/creareditarprendas/creareditarprendas.component';


export const routes: Routes = [
      {
            path:'usuarios', component: UsuariosComponent,
      },
      {
            path: 'roles', component: RolesComponent,
      },
      {
            path: 'prendas', component: PrendasComponent,
            children: [
                  {
                    path: 'nuevo', component: CreareditarprendasComponent
                  },
                  {
                    path: 'ediciones/:id',component: CreareditarprendasComponent
                  },
                ]
      },
      {
            path: 'conjuntos', component: ConjuntosComponent,
            children:[
                  {
                        path:'nuevo',component:CreareditarconjuntoComponent
                  },
                  {
                        path:'ediciones/:id',component:CreareditarconjuntoComponent
                  },
            ]
      },

];
