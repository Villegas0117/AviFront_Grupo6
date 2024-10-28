import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recomendaciones } from '../../../models/Recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
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
export class CrearEditarRecomendacionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  recomendacion: Recomendaciones = new Recomendaciones();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RecomendacionesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigoRecomendacion: [''],
      hcodigoUsuario: [''],
      hdescripcion: ['', Validators.required],
      hfechaCreacion: ['', Validators.required],
      hfechaModificacion: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.recomendacion.id_Recomendacion = this.form.value.hcodigoRecomendacion;
      this.recomendacion.id_usuario = this.form.value.hcodigoUsuario;
      this.recomendacion.descripcion = this.form.value.hdescripcion;
      this.recomendacion.fecha_Creacion = this.form.value.hfechaCreacion;
      this.recomendacion.fecha_modificacion = this.form.value.hfechaModificacion;
      if (this.edicion) {
        this.rS.update(this.recomendacion).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recomendacion).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['recomendaciones']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        
        this.form = new FormGroup({
          hcodigoRecomendacion: new FormControl(data.id_Recomendacion),
          hcodigoUsuario: new FormControl(data.id_usuario),
          hdescripcion: new FormControl(data.descripcion),
          hfechaCreacion: new FormControl(data.fecha_modificacion),
          hfechaModificacion: new FormControl(data.fecha_modificacion),
        });
      });
    }
  }
}
