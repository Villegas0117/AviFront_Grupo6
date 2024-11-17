import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ConjuntoSemanal } from '../../../models/Conjuntos_semanales';
import { ConjuntossemanalesService } from '../../../services/conjuntossemanales.service';

@Component({
  selector: 'app-listaconjuntossemanales',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listaconjuntossemanales.component.html',
  styleUrl: './listaconjuntossemanales.component.css'
})
export class ListaconjuntossemanalesComponent implements OnInit{
  dataSource: MatTableDataSource<ConjuntoSemanal> = new MatTableDataSource();
  

  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5', 'eliminar','editar']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ConjuntossemanalesService) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
