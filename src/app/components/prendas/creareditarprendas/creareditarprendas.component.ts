import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { Prendas } from '../../../models/Prendas';
import { PrendasService } from '../../../services/prendas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuarios } from '../../../models/Usuarios';

@Component({
  selector: 'app-creareditarprendas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarprendas.component.html',
  styleUrl: './creareditarprendas.component.css',
})
export class CreareditarprendasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  prenda: Prendas = new Prendas();
  edition: boolean = false;
  id: number = 0;
  tipoPrenda: boolean = false;
  listaUsuarios: Usuarios[] = [];
  formulario: FormGroup;
  fileName: string = '';


  listaPrendas: { value: string; viewValue: string }[] = [
    { value: 'Camisa', viewValue: 'Camisa' },
    { value: 'Polo', viewValue: 'Polo' },
    { value: 'Playera', viewValue: 'Playera' },
    { value: 'Blusa', viewValue: 'Blusa' },
    { value: 'Zapatillas', viewValue: 'Zapatillas' },
    { value: 'Tacones', viewValue: 'Tacones' },
    { value: 'Botas', viewValue: 'Botas' },
    { value: 'Zapatos', viewValue: 'Zapatos' },
    { value: 'Sandalias', viewValue: 'Sandalias' },
    { value: 'Calcetas', viewValue: 'Calcetas' },
    { value: 'Pantalon', viewValue: 'Pantalon' },
    { value: 'Pans', viewValue: 'Pans' },
    { value: 'Shorts', viewValue: 'Shorts' },
    { value: 'Mallas', viewValue: 'Mallas' },
    { value: 'Pans', viewValue: 'Pans' },
    { value: 'Vestido', viewValue: 'Vestido' },
    { value: 'Terno', viewValue: 'Terno' },
    { value: 'Chaleco', viewValue: 'Chaleco' },
    { value: 'Sueter', viewValue: 'Sueter' },
    { value: 'Chaqueta', viewValue: 'Chaqueta' },
    { value: 'Sudadera', viewValue: 'Sudadera' },
    { value: 'Bufanda', viewValue: 'Bufanda' },
    { value: 'Guantes', viewValue: 'Guantes' },
  ];

  constructor(
    private pS: PrendasService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {
    this.formulario = this.fb.group({
      nombre: [''],
      imagen: [''],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      this.fileName = file.name; // Guardar el nombre del archivo
      reader.onloadend = () => {
        const base64String = reader.result as string;
  
        // Quitar el prefijo 'data:image/jpeg;base64,' o similares
        const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
  
        // Actualiza el formulario con la imagen en base64 sin el prefijo
        this.form.patchValue({
          himagen: base64WithoutPrefix,
        });
      };
      reader.readAsDataURL(file); // Convierte la imagen en base64
    }
  }
  
  

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      //Sin validación
      hid: [],
      hid_usuario: ['', Validators.required],
      hnombre_prenda: ['', Validators.required],
      htipo_prenda: ['', Validators.required],
      himagen: ['', Validators.required],
      hfecha_creacion: ['', Validators.required],
      hfecha_modificacion: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.prenda.id_prenda = this.form.value.hid;
      this.prenda.id_usuario.id = this.form.value.hid_usuario;
      this.prenda.nombre_prenda = this.form.value.hnombre_prenda;
      this.prenda.tipo_prenda = this.form.value.htipo_prenda;
      this.prenda.imagen = this.form.value.himagen;
      this.prenda.fecha_creacion = this.form.value.hfecha_creacion;
      this.prenda.fecha_modificacion = this.form.value.hfecha_modificacion;
  
     
  
      if (this.edition) {
        this.pS.update(this.prenda).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.prenda).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
  
      this.router.navigate(['prendas']);
    } 
  }
  
  

  init() {
    if (this.edition) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_prenda),
          hid_usuario: new FormControl(data.id_usuario.id),
          hnombre_prenda: new FormControl(data.nombre_prenda),
          htipo_prenda: new FormControl(data.tipo_prenda),
          himagen: new FormControl(data.imagen),
          hfecha_creacion: new FormControl(data.fecha_creacion),
          hfecha_modificacion: new FormControl(data.fecha_modificacion),
        });
      });
    }
  }
}
