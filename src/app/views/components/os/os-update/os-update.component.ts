import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { OS } from 'src/app/Models/OS';
import { Tecnico } from 'src/app/Models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  osid: any;

  LISTA_TECNICOS: Tecnico[] = [];
  LISTA_CLIENTES: Cliente[] = [];

  objOS: OS = {
    cliente: '',
    tecnico: '',
    observacoes: '',
    status: '',
    prioridade:''
  }

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private osservice: OsService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    ngOnInit(){
      this.listaTecnicos();
      this.listaClientes();
      this.osid = this.route.snapshot.paramMap.get('id');
      this.findByID(this.osid);
    }

    cancel():void{
        this.router.navigate(['os']);
    }

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

  findByID(id: any):void{
    this.osservice.findByID(id).subscribe(
      resposta => {
        this.objOS = resposta;
        console.log(resposta);
        this.converteDados();
      }
    )
  }

  update():void{
    console.log(this.osid);
    console.log(this.objOS);
      this.osservice.update(this.objOS,this.osid).subscribe(
        resposta => {
          this.osservice.openSnackBar("Ordem de serviço atualizada com sucesso.")
          this.router.navigate(['os'])
        })

  }

  converteDados():void{
    if(this.objOS.status == "ABERTO"){
      this.objOS.status = 0;
    } else if (this.objOS.status == "ANDAMENTO"){
      this.objOS.status = 1;
    } else {
      this.objOS.status = 2;
    }


  if(this.objOS.prioridade == "ALTA"){
    this.objOS.prioridade = 2;
  } else if (this.objOS.prioridade == "MEDIA"){
    this.objOS.prioridade = 1;
  } else {
    this.objOS.prioridade = 0
  }
  }

}
