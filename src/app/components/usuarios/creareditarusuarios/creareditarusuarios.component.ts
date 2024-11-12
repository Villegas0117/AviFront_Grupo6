import { Usuarios } from './../../../models/Usuarios';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
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
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-creareditarusuarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,MatIconModule
  ],
  templateUrl: './creareditarusuarios.component.html',
  styleUrl: './creareditarusuarios.component.css',
})
export class CreareditarusuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuarios = new Usuarios();
  edicion: any;
  id: number = 0;
  showPassword = false;
  

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //Trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      //Sin Validacion
      hcodigo: [],
      hnombre: ['', Validators.required],
      hmail: ['', Validators.required],
      hpass: ['', Validators.required],
      hfecha: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.usuario.id = this.form.value.hcodigo;
      this.usuario.username = this.form.value.hnombre;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpass;
      this.usuario.enabled = true;
      this.usuario.fecha_registro = this.usuario.fecha_registro;
      this.usuario.fecha_modificacion = this.form.value.hfecha;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hpass:new FormControl(data.password),
          hnombre: new FormControl(data.username),
          hmail: new FormControl(data.email),
          hfecha: new FormControl(data.fecha_modificacion),
        });
      });
    }
  }
}
