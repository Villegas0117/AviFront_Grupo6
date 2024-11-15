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
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
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
    canActivate: [seguridadGuard],
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
    canActivate: [seguridadGuard],
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
    canActivate: [seguridadGuard],
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
    canActivate: [seguridadGuard],
  },
  {
    path: 'galerias',
    component: GaleriaComponent,
    children: [
      {
        path: 'registrar',
        component: CreareditargaleriaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditargaleriaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'Conjuntos_semanal',
    component: ConjuntossemanalesComponent,
    children: [
      {
        path: 'registrar',
        component: CrearregistrarconjuntossemanalesComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearregistrarconjuntossemanalesComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'tendencias',
    component: TendenciasComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditartendenciasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditartendenciasComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'recomendaciones',
    component: RecomendacionesComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearEditarRecomendacionesComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearEditarRecomendacionesComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
  },
];
