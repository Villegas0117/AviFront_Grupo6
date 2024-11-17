import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recomendaciones } from '../../../models/Recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { Tendencia } from '../../../models/Tendencia';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { TendenciasService } from '../../../services/tendencias.service';
@Component({
  selector: 'app-crear-editar-recomendaciones',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,    
    CommonModule,
  ],
  templateUrl: './crear-editar-recomendaciones.component.html',
  styleUrl: './crear-editar-recomendaciones.component.css'
})
export class CrearEditarRecomendacionesComponent{
  form: FormGroup = new FormGroup({});
  listaTendencias: Tendencia[]=[];
  listaUsuarios: Usuarios[]=[];
  recomendacion: Recomendaciones = new Recomendaciones();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RecomendacionesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private tS: TendenciasService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
  });

    this.form = this.formBuilder.group({
      hcodigo:[''],
      hUsuario: ['', Validators.required],
      hTendencia: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfechaCreacion: ['', [Validators.required, this.fechaFuturaValidator]],
      hfechaModificacion: ['', [Validators.required, this.fechaFuturaValidator]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.tS.list().subscribe((data) => {
      this.listaTendencias = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.recomendacion.id_Recomendacion= this.form.value.hcodigo;
      this.recomendacion.descripcion = this.form.value.hdescripcion;
      // Asigna el idUsuario y idTendencia
      this.recomendacion.id_Usuario.id = this.form.value.hUsuario;
      this.recomendacion.id_Tendencia.idTendencia = this.form.value.hTendencia;
      this.recomendacion.fecha_creacion = this.form.value.hfechaCreacion;
      this.recomendacion.fecha_modificacion = this.form.value.hfechaModificacion;
      if (this.edicion) {
        this.rS.update(this.recomendacion).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recomendacion).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          })
        });
      }   
    }
    this.router.navigate(['recomendaciones']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id_Recomendacion),
          hdescripcion: new FormControl(data.descripcion),
          hfechaCreacion: new FormControl(data.fecha_creacion),
          hUsuario:  new FormControl(data.id_Usuario.username),
          hTendencia:  new FormControl(data.id_Tendencia.popularidad),
          hfechaModificacion: new FormControl(data.fecha_modificacion),
        });
      });
    }
  }

  fechaFuturaValidator(control: FormControl) {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
    return fechaIngresada < fechaActual ? { fechaFutura: true } : null;
  }
  
}