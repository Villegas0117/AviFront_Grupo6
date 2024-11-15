import { Component, OnInit, ViewChild } from '@angular/core';
import { Conjuntos } from '../../../models/Conjuntos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarconjuntos',
  standalone: true,
  imports: [ 
    MatCardModule, 
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatCardModule
  ],
  templateUrl: './listarconjuntos.component.html',
  styleUrl: './listarconjuntos.component.css',
})
export class ListarconjuntosComponent implements OnInit {
  dataSource: MatTableDataSource<Conjuntos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'accion01',
    'accion02',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ConjuntosService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    //Subscribe para traer data
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
