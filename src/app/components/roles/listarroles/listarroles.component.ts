import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Roles>=new MatTableDataSource();
  displayedColumns:String[]=['c1','c2','c3'];

  constructor(private rS:RolesService){}

  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
}
