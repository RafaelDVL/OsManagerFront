import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from 'src/app/Models/tecnico';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
})
export class TecnicoCreateComponent {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router: Router, private service: TecnicoService) {}

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe({
      next: (resposta) => {
        this.service.openSnackBar('Tecnico Cadastrado');
        this.router.navigate(['tecnicos']);
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
