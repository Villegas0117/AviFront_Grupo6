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
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ConjuntoSemanal } from '../../../models/Conjuntos_semanales';
import { Conjuntos } from '../../../models/Conjuntos';
import { ConjuntossemanalesService } from '../../../services/conjuntossemanales.service';
import { ConjuntosService } from '../../../services/conjuntos.service';


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
  conjsemanal: ConjuntoSemanal = new ConjuntoSemanal();
  listausuarios: Usuarios[]= [];
  listaconjunto: Conjuntos[]=[];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private csS: ConjuntossemanalesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private cS:ConjuntosService,
    private uS: UsuarioService,
 
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
      hfechacreacion: ['', [Validators.required, this.fechaFuturaValidator]],
      hdiadesemana: ['', [Validators.required, this.fechaFuturaValidator]],
     
    });
    this.cS.list().subscribe((data) =>{
      this.listaconjunto=data;
    })
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
    
  }
  insertar(): void {
    if (this.form.valid) {
      this.conjsemanal.id= this.form.value.hcodigo;
      this.conjsemanal.id_Conjunto.id_Conjunto=this.form.value.hidconjunto;
      this.conjsemanal.id_usuario.id=this.form.value.hidusuario;
      this.conjsemanal.fechaCreacion=this.form.value.hfechacreacion;
      this.conjsemanal.diaDeSemana=this.form.value.hdiadesemana;

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
          hidconjunto: new FormControl(data.id_Conjunto),
          hidusuario:new FormControl(data.id_usuario.username),
          hfechacreacion:new FormControl(data.fechaCreacion),
          hdiadesemana:new FormControl(data.diaDeSemana),
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
