import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { CreareditarprendasComponent } from './components/prendas/creareditarprendas/creareditarprendas.component';
import { CreareditarconjuntosComponent } from './components/conjuntos/creareditarconjuntos/creareditarconjuntos.component';


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
                        path:'nuevo',component:CreareditarconjuntosComponent
                  },
                  {
                        path:'ediciones/:id',component:CreareditarconjuntosComponent
                  },
            ]
      },

];
