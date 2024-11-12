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

import { ActivatedRoute, Params, Router } from '@angular/router';
import { galerias } from '../../../models/Galerias';
import { GaleriaService } from '../../../services/galeria.service';
import { CommonModule } from '@angular/common';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creareditargaleria',
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
  templateUrl: './creareditargaleria.component.html',
  styleUrl: './creareditargaleria.component.css'
})
export class CreareditargaleriaComponent {
  form: FormGroup = new FormGroup({});
  galeria: galerias = new galerias();
  listausuarios: Usuarios[]= [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private gS: GaleriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
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
      hnombre: ['', Validators.required],
      hfechacreacion: ['', [Validators.required, this.fechaFuturaValidator]],
      hfechamodificacion: ['', [Validators.required, this.fechaFuturaValidator]],
      hidusuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.galeria.idGaleria= this.form.value.hcodigo;
      this.galeria.nombreGaleria=this.form.value.hnombre;
      this.galeria.fechaCreacion=this.form.value.hfechacreacion;
      this.galeria.fechaModificacion=this.form.value.hfechamodificacion;
      this.galeria.idUsuario.id= this.form.value.hidusuario;

      if (this.edicion) {
        this.gS.update(this.galeria).subscribe((data) => {
          this.gS.list().subscribe((data) => {
            this.gS.setList(data);
          });
        });
      } else {
        this.gS.insert(this.galeria).subscribe(data=>{
          this.gS.list().subscribe(data=>{
            this.gS.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['galerias'])
  }
  init() {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idGaleria),
          hnombre: new FormControl(data.nombreGaleria),
          hfechacreacion:  new FormControl(data.fechaCreacion),
          hfechamodificacion:  new FormControl(data.fechaModificacion),
          hidusuario: new FormControl(data.idUsuario.username)
         
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
