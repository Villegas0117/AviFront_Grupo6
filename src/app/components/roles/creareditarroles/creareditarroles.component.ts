import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditarroles',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditarroles.component.html',
  styleUrl: './creareditarroles.component.css',
})
export class CreareditarrolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Roles = new Roles();
  edicion:boolean = false;
  id: number = 0;

  userId: Usuarios[]=[]
  listaRoles:{value: string; viewValue: string}[]=[
    {value:'Administrador',   viewValue:'Administrador'},
    {value:'Usuario', viewValue: 'Usuario'}
  ];
  constructor(
    private rS: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    //Validadores
    this.form = this.formBuilder.group({
      hid: [],
      hrol: ['', Validators.required],
      huserid: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>  {
      this.userId=data;
    })
  }

  insertar(): void {
    if (this.form.valid) {
      this.rol.id = this.form.value.hid;
      this.rol.rol = this.form.value.hrol;
      this.rol.user.id = this.form.value.huserid;
      if (this.edicion) {
        this.rS.update(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['roles']);
  }
  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hid: new FormControl(data.id),
          hrol: new FormControl(data.rol),
          huserid: new FormControl(data.user.id)
        });
      });
    }
  }
}
