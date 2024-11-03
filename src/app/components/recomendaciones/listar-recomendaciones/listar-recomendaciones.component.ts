import { Component, OnInit, ViewChild } from '@angular/core';
import { Recomendaciones } from '../../../models/Recomendaciones';
import { RecomendacionesService } from '../../../services/recomendaciones.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-recomendaciones',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listar-recomendaciones.component.html',
  styleUrl: './listar-recomendaciones.component.css'
})
export class ListarRecomendacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource();
  displayedColumns:String[]=['c1','c2','c3','c4','c5','c6', 'accion01','accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS :RecomendacionesService){
  }
  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
