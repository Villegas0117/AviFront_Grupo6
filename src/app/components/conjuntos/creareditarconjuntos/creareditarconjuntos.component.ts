import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Conjuntos } from '../../../models/Conjuntos';
import { Usuarios } from '../../../models/Usuarios';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { GaleriasService } from '../../../services/galerias.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Galerias } from '../../../models/Galerias';


@Component({
  selector: 'app-creareditarconjuntos',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creareditarconjuntos.component.html',
  styleUrl: './creareditarconjuntos.component.css'
})
export class CreareditarconjuntosComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  conjunto: Conjuntos = new Conjuntos();
  edicion: boolean = false;
  id: number = 0;

  listaUsuarios: Usuarios[]=[];
  listaGaleria: Galerias[]=[]

  constructor(
    private cS:ConjuntosService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private gS: GaleriasService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      //Sin validación
      hid_Conjunto: [],
      hid_Usuario: ['', Validators.required],
      hnombre_Conjunto: ['', Validators.required],
      hid_Galeria: ['', Validators.required],
      hfecha_Creacion: ['', Validators.required],
      hfecha_Modificacion: ['', Validators.required],
    });
    this.uS.list().subscribe(data =>{
      this.listaUsuarios= data;
    })
    this.gS.list().subscribe(data =>{
      this.listaGaleria= data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.conjunto.id_Conjunto= this.form.value.hid_Conjunto;
      this.conjunto.id_Usuario.id = this.form.value.hid_Usuario;
      this.conjunto.nombre_Conjunto = this.form.value.hnombre_Conjunto;
      this.conjunto.id_Galeria.idGaleria = this.form.value.hid_Galeria;
      this.conjunto.fecha_Creacion= this.form.value.hfecha_Creacion;
      this.conjunto.fecha_Modificacion = this.form.value.hfecha_Modificacion;

      if (this.edicion) {
        this.cS.update(this.conjunto).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.conjunto).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['conjuntos']);
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid_Conjunto: new FormControl(data.id_Conjunto),
          hid_Usuario: new FormControl(data.id_Usuario.id),
          hnombre_Conjunto: new FormControl(data.nombre_Conjunto),
          hid_Galeria: new FormControl(data.id_Galeria.idGaleria),
          hfecha_Creacion: new FormControl(data.fecha_Creacion),
          hfecha_Modificacion: new FormControl(data.fecha_Modificacion),
          
        });
      });
    }
  }
}
