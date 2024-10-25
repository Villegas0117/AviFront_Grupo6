import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Conjuntos } from '../../../models/Conjuntos';
import { ConjuntosService } from '../../../services/conjuntos.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listarconjuntos',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarconjuntos.component.html',
  styleUrl: './listarconjuntos.component.css'
})
export class ListarconjuntosComponent implements OnInit {
  dataSource : MatTableDataSource<Conjuntos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private cS: ConjuntosService){}

  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
  


}
 