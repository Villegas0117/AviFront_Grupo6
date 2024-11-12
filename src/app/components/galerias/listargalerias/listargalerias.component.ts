import { Component, OnInit } from '@angular/core';
import { Galerias } from '../../../models/Galerias';
import { GaleriasService } from '../../../services/galerias.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listargalerias',
  standalone: true,
  imports: [],
  templateUrl: './listargalerias.component.html',
  styleUrl: './listargalerias.component.css'
})
export class ListargaleriasComponent implements OnInit{
  dataSource: MatTableDataSource<Galerias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  constructor(private gS: GaleriasService) {}
  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.gS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
