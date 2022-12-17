import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  idcliente = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);
constructor(private router: Router, private service: ClienteService, private route: ActivatedRoute){

}
  ngOnInit(){
    this.idcliente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }


  errorValidNome() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!';
    } else {
      return false;
    }
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O cpf digitado não é valido!';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O campo telefone precisa de um numero valido';
    }
    return false;
  }

  cancel(){
    this.router.navigate(['clientes'])
  }

  findById(){
    this.service.findByID(this.idcliente).subscribe(
      (resposta) => {
          this.cliente = resposta;
      })
  }

  deleteById(){
    this.service.delete(this.cliente.id).subscribe(
      (resposta) => {
        this.service.openSnackBar("Usuario deletado com sucesso")
        this.router.navigate(['clientes'] )
      }
    )
  }

}
