import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../Models/tecnico';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../Models/cliente';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {


  LISTA_TECNICOS: Tecnico[] = [];
  LISTA_CLIENTES: Cliente[] = [];

  selectedtec = '';
  selectedcli = '';
  selectedsta = '';
  selectedpri = '';

  ngOnInit(){
    this.listaTecnicos();
    this.listaClientes();
  }


  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
    ){}

  listaTecnicos():void{
      this.tecnicoService.findAll().subscribe(
        (resposta) => {
          this.LISTA_TECNICOS = resposta;
        }
      )
  }

  listaClientes():void{
    this.clienteService.findAll().subscribe(
      (resposta) => {
        this.LISTA_CLIENTES = resposta;
      }
    )
  }

}
