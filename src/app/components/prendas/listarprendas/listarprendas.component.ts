import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrendasService } from '../../../services/prendas.service';
import { Prendas } from '../../../models/Prendas';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-listarprendas',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule,RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './listarprendas.component.html',
  styleUrl: './listarprendas.component.css',
  
})
export class ListarprendasComponent implements OnInit {
  dataSource: MatTableDataSource<Prendas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01','accion02'];

  constructor(private pS: PrendasService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    //Subscribe para traer data
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}