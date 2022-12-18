import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../Models/tecnico';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../Models/cliente';
import { OS } from 'src/app/Models/OS';
import { OsService } from 'src/app/services/os.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {


  LISTA_TECNICOS: Tecnico[] = [];
  LISTA_CLIENTES: Cliente[] = [];

  objOS: OS = {
    cliente: '',
    tecnico: '',
    observacoes: '',
    status: '',
    prioridade:''
  }

  ngOnInit(){
    this.listaTecnicos();
    this.listaClientes();
  }

  cancel():void{
      this.router.navigate(['os']);
  }


  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private osservice: OsService,
    private router: Router
    ){}

  listaTecnicos():void{
      this.tecnicoService.findAll().subscribe(
        resposta => {
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

  createOs():void{
      this.osservice.create(this.objOS).subscribe(
        resposta => {
          this.osservice.openSnackBar("Ordem de serviço cadastrada com sucesso.")
          this.router.navigate(['os'])
        })
  }

}
