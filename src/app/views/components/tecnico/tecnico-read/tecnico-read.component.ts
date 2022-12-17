import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/Models/tecnico';
import { TecnicoService } from '../../../../services/tecnico.service';



@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  LISTA_TECNICOS: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'actions'];
  dataSource = new MatTableDataSource<Tecnico>(this.LISTA_TECNICOS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private router: Router
    ){

  }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.LISTA_TECNICOS = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.LISTA_TECNICOS);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void{
    this.router.navigate(['tecnicos/create'])
  }

  navigateToUpdate(id: any):void{
    this.router.navigate(['tecnicos/update/'+ id])
  }

  navigateToDelete(id: any):void{
    this.router.navigate(['tecnicos/delete/'+ id])
  }


}





