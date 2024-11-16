import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Galerias } from '../../../models/Galerias';
import { GaleriasService } from '../../../services/galerias.service';

@Component({
  selector: 'app-listargaleria',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listargaleria.component.html',
  styleUrl: './listargaleria.component.css'
})
export class ListargaleriaComponent implements OnInit{
  dataSource: MatTableDataSource<Galerias> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4', 'c5', 'eliminar','editar']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gS: GaleriasService) {}

  ngOnInit(): void {
    this.gS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.gS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.gS.delete(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data);
      });
    });
  }
}
