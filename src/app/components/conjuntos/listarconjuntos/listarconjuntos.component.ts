import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Conjuntos } from '../../../models/Conjuntos';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listarconjuntos',
  standalone: true,
  imports: [MatTableModule,CommonModule, MatIconModule, RouterLink, ],
  templateUrl: './listarconjuntos.component.html',
  styleUrl: './listarconjuntos.component.css'
})
export class ListarconjuntosComponent implements OnInit {
  dataSource : MatTableDataSource<Conjuntos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
     'c2', 
     'c3', 
     'c4', 
     'c5',
     'accion01',
     'accion02'];

  constructor(private cS: ConjuntosService){}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
 