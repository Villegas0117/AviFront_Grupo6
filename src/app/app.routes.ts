import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { CreareditargaleriaComponent } from './components/galeria/creareditargaleria/creareditargaleria.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { CrearEditarRecomendacionesComponent } from './components/recomendaciones/crear-editar-recomendaciones/crear-editar-recomendaciones.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { CreareditartendenciasComponent } from './components/tendencias/creareditartendencias/creareditartendencias.component';

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
            path:'galerias',component:GaleriaComponent,
            children:[
                {
                    path:'registrar',component:CreareditargaleriaComponent
                },
                {
                    path:'ediciones/:id',component:CreareditargaleriaComponent
                },
            ]
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
      },
      {
            path: 'tendencias', component: TendenciasComponent,
            children:[
                  {
                  path:'nuevo',component:CreareditartendenciasComponent
                  },
                  {
                  path:'ediciones/:id',component:CreareditartendenciasComponent
                  }
            ]
      }
];
