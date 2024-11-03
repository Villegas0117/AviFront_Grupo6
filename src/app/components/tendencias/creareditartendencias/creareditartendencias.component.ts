import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker } from '@angular/material/datepicker';
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
import { Tendencia } from '../../../models/Tendencia';
import { TendenciasService } from '../../../services/tendencias.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creareditartendencias',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepicker,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditartendencias.component.html',
  styleUrl: './creareditartendencias.component.css'
})
export class CreareditartendenciasComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  tendencias: Tendencia = new Tendencia();

  id: number = 0;
  edicion: boolean = false;

  listaCategorias: { value: string; viewValue: string }[] = [
    { value: 'Casual', viewValue: 'Casual' },
    { value: 'Formal', viewValue: 'Formal' },
    { value: 'Deportivo', viewValue: 'Deportivo' },
    { value: 'Streetwear', viewValue: 'Streetwear' },
    { value: 'Vintage', viewValue: 'Vintage' },
    { value: 'Minimalista', viewValue: 'Minimalista' },
    { value: 'Étnico', viewValue: 'Étnico' },
  ];
  listaPopularidad: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1 - Baja popularidad' },
    { value: '2', viewValue: '2 - Popularidad baja' },
    { value: '3', viewValue: '3 - Popularidad media' },
    { value: '4', viewValue: '4 - Alta popularidad' },
    { value: '5', viewValue: '5 - Muy alta popularidad' }
  ];
  constructor(
    private tS: TendenciasService,
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
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hcategoria: ['', Validators.required],
      hpopularidad: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tendencias.idTendencia = this.form.value.hcodigo;
      this.tendencias.nombre = this.form.value.hnombre;
      this.tendencias.descripcion = this.form.value.hdescripcion;
      this.tendencias.categoria = this.form.value.hcategoria;
      this.tendencias.popularidad = this.form.value.hpopularidad;
      if (this.edicion) {
        this.tS.update(this.tendencias).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tendencias).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['tendencias']);
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idTendencia),
          hnombre: new FormControl(data.nombre),
          hdescripcion: new FormControl(data.descripcion),
          hcategoria: new FormControl(data.categoria),
          hpopularidad: new FormControl(data.popularidad),
        });
      });
    }
  }
}
