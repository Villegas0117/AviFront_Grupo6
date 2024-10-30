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
import { Galerias } from '../../../models/Galerias';
import { GaleriaService } from '../../../services/galeria.service';
import { CommonModule } from '@angular/common';

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
  galeria: Galerias = new Galerias();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private vS: GaleriaService,
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
      hcodigo:[''],
      hnombre: ['', Validators.required],
      hfechacreacion: ['', Validators.required],
      hfechamodificacion: ['', Validators.required],
      hidusuario: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.galeria.idGaleria= this.form.value.hcodigo;
      this.galeria.nombreGaleria=this.form.value.hnombre;
      this.galeria.fechaCreacion=this.form.value.hfechacreacion;
      this.galeria.fechaModificacion=this.form.value.hfechamodificacion;
      this.galeria.idUsuario = parseInt(this.form.value.hidusuario, 10);
      if (this.edicion) {
        this.vS.update(this.galeria).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      } else {
        this.vS.insert(this.galeria).subscribe(data=>{
          this.vS.list().subscribe(data=>{
            this.vS.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['galerias'])
  }
  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idGaleria),
          hnombre: new FormControl(data.nombreGaleria),
          hfechacreacion:  new FormControl(data.fechaCreacion),
          hfechamodificacion:  new FormControl(data.fechaModificacion),
          hidusuario: new FormControl(data.idUsuario.toString())
         
        });
      });
    }
  }


}
