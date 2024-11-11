import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tendencia } from '../../../models/Tendencia';
import { TendenciasService } from '../../../services/tendencias.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listartendencias',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listartendencias.component.html',
  styleUrl: './listartendencias.component.css'
})
export class ListartendenciasComponent implements OnInit{
  dataSource: MatTableDataSource<Tendencia>=new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'accion01','accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TendenciasService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }

}
