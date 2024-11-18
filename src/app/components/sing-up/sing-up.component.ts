import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../../models/Usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../services/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '../../models/Roles';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [MatInputModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css',
})
export class SingUpComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuarios = new Usuarios();
  rol: Roles = new Roles();
  showPassword = false;

  constructor(
    private uS: UsuarioService,
    private rS: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['', Validators.required],
      hpass: ['', [Validators.required, Validators.minLength(6)]],
      hmail: ['', [Validators.required, Validators.email]],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      // Configuración inicial del objeto usuario
      this.usuario.username = this.form.value.hnombre;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpass;
      this.usuario.enabled = true;
      this.usuario.fecha_registro = new Date(); // Fecha actual
      this.usuario.fecha_modificacion = new Date(); // Fecha actual

      // Insertar el usuario y esperar la respuesta antes de continuar
      this.uS.insert(this.usuario).subscribe({
        next: () => {
          this.uS.listNoAuth(this.usuario.email).subscribe(response => {
            console.log("El id del nuevo usuario es ", response.id);
            const insert = new Roles();
            const idU = new Usuarios();
            idU.id = response.id;

            insert.rol = 'CREADOR';
            insert.user = idU;

            this.rS.insert(insert).subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
              error: (err) => {
                console.error('Error inserting role:', err);
              }
            });
          });
        },
        error: (err) => {
          console.error('Error inserting user:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
