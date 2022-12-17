import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit {

  listClientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.listClientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router ){
  }

  ngAfterViewInit() {
    this.findAll();
    this.dataSource.paginator = this.paginator;
  }

  navigateToCreate(){
    this.router.navigate(["clientes/create"])
  }

  navigateToUpdate(id: any):void{
    this.router.navigate(['clientes/update/'+ id])
  }

  navigateToDelete(id: any):void{
    this.router.navigate(['clientes/delete/'+ id])
  }

  findAll():void{
    this.service.findAll().subscribe(
      (resposta) => {
          this.listClientes = resposta;
          this.dataSource = new MatTableDataSource<Cliente>(this.listClientes);
          this.dataSource.paginator = this.paginator;
      }
    )
  }

}

