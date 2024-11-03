import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './crear-editar-recomendaciones.component.html',
  styleUrl: './crear-editar-recomendaciones.component.css'
})
export class CrearEditarRecomendacionesComponent implements OnInit{
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
    private uS: UsuarioService,
    private tS: TendenciasService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hUsuario: ['', Validators.required],
      hTendencia: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfechaCreacion: ['', Validators.required],
      hfechaModificacion: ['', Validators.required],
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
      this.recomendacion.descripcion = this.form.value.hdescripcion;
      this.recomendacion.fecha_creacion = this.form.value.hfechaCreacion;
      this.recomendacion.fecha_modificacion = this.form.value.hfechaModificacion;
      // Asigna el idUsuario y idTendencia
      this.recomendacion.id_Usuario = this.form.value.hUsuario;
      this.recomendacion.id_Tendencia = this.form.value.hTendencia;
      this.rS.insert(this.recomendacion).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
        this.router.navigate(['recomendaciones']);
    } 
  }
}