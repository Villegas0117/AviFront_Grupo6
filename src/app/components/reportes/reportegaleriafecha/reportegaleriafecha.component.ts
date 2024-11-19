import { Component, OnInit, ViewChild } from '@angular/core';
import { GaleriaService } from '../../../services/galeria.service';
import { GaleriaUserDTO } from '../../../models/GaleriaUserDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-reportegaleriafecha',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './reportegaleriafecha.component.html',
  styleUrl: './reportegaleriafecha.component.css'
})
export class ReportegaleriafechaComponent implements OnInit{
  dataSource: MatTableDataSource<GaleriaUserDTO> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gS: GaleriaService) {}

  ngOnInit(): void {
    this.gS.getfechagaleria().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }

}
