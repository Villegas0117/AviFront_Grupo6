import { Component, OnInit } from '@angular/core';
import { Recomendaciones } from '../../../models/Recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-recomendaciones',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource();

  displayedColumns:String[]=['c1','c2','c3','c4','c5', 'accion01','accion02'];
  
  constructor(private rS :RecomendacionesService){

  }
  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
