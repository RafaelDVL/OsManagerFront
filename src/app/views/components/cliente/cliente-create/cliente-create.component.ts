import { Component } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  tecnico: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router: Router, private service: ClienteService) {}

  cancel(): void {
    this.router.navigate(['clientes']);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe({
      next: (resposta) => {
        this.service.openSnackBar('Tecnico Cadastrado');
        this.router.navigate(['clientes']);
      },
      error: (err) => {
        if (err.error.error.match('CPF ja cadastrado')) {
          console.log(err);
          this.service.openSnackBar('CPF ja possui um registro no sistema!');
          alert('CPF ja possui um registro no sistema!' + err.error.error);
        } else {
          console.log(err);
          alert(err.error.error);
        }
      },
    });
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
}
