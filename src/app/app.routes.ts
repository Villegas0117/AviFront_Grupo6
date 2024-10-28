import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { CrearEditarRecomendacionesComponent } from './components/recomendaciones/crear-editar-recomendaciones/crear-editar-recomendaciones.component';

export const routes: Routes = [
      {
            path:'usuarios', component: UsuariosComponent,
      },
      {
            path: 'roles', component: RolesComponent,
      },
      {
            path: 'prendas', component: PrendasComponent,
      },
      {
            path: 'conjuntos', component: ConjuntosComponent,
      },
      {
            path: 'recomendaciones', component: RecomendacionesComponent,
            children:[
                  {
                      path:'nuevo',component:CrearEditarRecomendacionesComponent
                  },
                  {
                        path:'ediciones/:id',component:CrearEditarRecomendacionesComponent
                  }
            ]
      }
];
