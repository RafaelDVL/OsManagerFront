import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/Models/OS';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from '../../../../services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  LISTA_OS: OS[] = [];

  displayedColumns: string[] = ['tecnico','cliente', 'dataabert', 'datafech', 'prioridade', 'observacoes','status', 'actions'];
  dataSource = new MatTableDataSource<OS>(this.LISTA_OS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoservice: TecnicoService,
    private clienteservice: ClienteService
    ){

  }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.LISTA_OS = resposta;
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.LISTA_OS);
      this.dataSource.paginator = this.paginator;
    })
  }

  listarCliente():void{
    this.LISTA_OS.forEach( x => {
      this.clienteservice.findByID(x.cliente).subscribe(
        (resposta) => {
          x.cliente = resposta.nome
        }
      )
    })
  }

  listarTecnico():void{
    this.LISTA_OS.forEach( x => {
      this.tecnicoservice.findByID(x.tecnico).subscribe(
        (resposta) => {
          x.tecnico = resposta.nome
        }
      )
    })
  }


  prioridade(x: any){
    if(x =='BAIXA'){
      return 'baixa';
    } else if (x == 'MEDIA'){
      return 'media';
    } else {
      return 'alta';
    }
  }

  navigateToCreate():void{
    this.router.navigate(['os/create'])
  }

  navigateToUpdate(id: any):void{
    this.router.navigate(['os/update/'+ id])
  }

  navigateToDelete(id: any):void{
    this.router.navigate(['os/delete/'+ id])
  }


}





