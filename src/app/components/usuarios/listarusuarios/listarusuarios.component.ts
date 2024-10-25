import { Component, OnInit } from '@angular/core';
import { Usuarios} from '../../../models/Usuarios';
import {MatTableDataSource,  MatTableModule} from '@angular/material/table'
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent implements OnInit{
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();

  displayedColumns:String[]=['c1','c2','c3','c4','c5'];
  
  constructor(private uS :UsuarioService){

  }
  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
}
