import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrendasComponent } from './components/prendas/prendas.component';
import { ConjuntosComponent } from './components/conjuntos/conjuntos.component';
import { CreareditarusuariosComponent } from './components/usuarios/creareditarusuarios/creareditarusuarios.component';
import { CreareditarrolesComponent } from './components/roles/creareditarroles/creareditarroles.component';
import { CreareditargaleriaComponent } from './components/galeria/creareditargaleria/creareditargaleria.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ConjuntossemanalesComponent } from './components/conjuntossemanales/conjuntossemanales.component';
import { CrearregistrarconjuntossemanalesComponent } from './components/conjuntossemanales/crearregistrarconjuntossemanales/crearregistrarconjuntossemanales.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { CreareditartendenciasComponent } from './components/tendencias/creareditartendencias/creareditartendencias.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { CrearEditarRecomendacionesComponent } from './components/recomendaciones/crear-editar-recomendaciones/crear-editar-recomendaciones.component';
import { CreareditarprendasComponent } from './components/prendas/creareditarprendas/creareditarprendas.component';
import { CreareditarconjuntosComponent } from './components/conjuntos/creareditarconjuntos/creareditarconjuntos.component';
export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarusuariosComponent,
      },
      {
        path: 'edicionUsuario/:id',
        component: CreareditarusuariosComponent,
      },
    ],
  },
  {
    path: 'roles',
    component: RolesComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarrolesComponent,
      },
      {
        path: 'edicionesRoles/:id',
        component: CreareditarrolesComponent,
      },
    ],
  },
  {
    path: 'prendas',
    component: PrendasComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarprendasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarprendasComponent,
      },
    ],
  },
  {
    path: 'conjuntos',
    component: ConjuntosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarconjuntosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarconjuntosComponent,
      },
    ],
  },
  {
      path: 'galerias',
      component: GaleriaComponent,
      children:[
            {
                  path: 'registrar',
                  component: CreareditargaleriaComponent
            },
            {
                  path: 'ediciones/:id',
                  component: CreareditargaleriaComponent
            }
      ]
  },
  {
      path: 'Conjuntos_semanal',
      component: ConjuntossemanalesComponent,
      children:[
            {
                  path: 'registrar',
                  component: CrearregistrarconjuntossemanalesComponent,
            },
            {
                  path: 'ediciones/:id',
                  component: CrearregistrarconjuntossemanalesComponent,
            }
      ]
  },
  {
      path: 'tendencias',
      component: TendenciasComponent,
      children:[
            {
                  path: 'nuevo',
                  component: CreareditartendenciasComponent,
            },
            {
                  path: 'ediciones/:id',
                  component: CreareditartendenciasComponent,
            }
      ]
  },
  {
      path: 'recomendaciones',
      component: RecomendacionesComponent,
      children: [
            {
                  path: 'nuevo',
                  component: CrearEditarRecomendacionesComponent
            },
            {
                  path:'ediciones/:id',
                  component : CrearEditarRecomendacionesComponent
            }
      ]
  }
];
