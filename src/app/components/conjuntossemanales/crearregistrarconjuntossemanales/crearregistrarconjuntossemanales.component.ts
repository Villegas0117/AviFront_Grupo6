import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { conjunto_dia } from '../../../models/Conjuntos_semanales';
import { Usuarios } from '../../../models/Usuarios';
import { Conjuntos } from '../../../models/Conjuntos';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { ConjuntossemanalesService } from '../../../services/conjuntossemanales.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crearregistrarconjuntossemanales',
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
  templateUrl: './crearregistrarconjuntossemanales.component.html',
  styleUrl: './crearregistrarconjuntossemanales.component.css'
})
export class CrearregistrarconjuntossemanalesComponent {
  form: FormGroup = new FormGroup({});
  conjsemanal: conjunto_dia = new conjunto_dia();
  listausuarios: Usuarios[]= [];
  listaconjunto: Conjuntos[]=[];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private csS: ConjuntossemanalesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private cS:ConjuntosService
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
      hidconjunto: ['', Validators.required],
      hidusuario: ['', Validators.required],
      hfechaCreacion: ['', [Validators.required, this.fechaFuturaValidator]],
      hdiaDeSemana: ['', [Validators.required, this.fechaFuturaValidator]],
     
    });
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
    this.cS.list().subscribe((data) =>{
      this.listaconjunto=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.conjsemanal.id= this.form.value.hcodigo
      this.conjsemanal.id_Conjunto=this.form.value.hidconjunto
      this.conjsemanal.id_usuario=this.form.value.hidusuario
      this.conjsemanal.fechaCreacion=this.form.value.hfechaCreacion
      this.conjsemanal.diaDeSemana=this.form.value.hdiaDeSemana

      if (this.edicion) {
        this.csS.update(this.conjsemanal).subscribe((data) => {
          this.csS.list().subscribe((data) => {
            this.csS.setList(data);
          });
        });
      } else {
        this.csS.insert(this.conjsemanal).subscribe(data=>{
          this.csS.list().subscribe(data=>{
            this.csS.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['Conjuntos_semanal'])
  }
  init() {
    if (this.edicion) {
      this.csS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hidconjunto: new FormControl(data.id_Conjunto.nombre_Conjunto),
          hidusuario:new FormControl(data.id_usuario.username),
          hfechaCreacion:new FormControl(data.fechaCreacion),
          hdiaDeSemana:new FormControl(data.diaDeSemana), 
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
