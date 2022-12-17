import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/Models/tecnico';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  idtecnico = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);
constructor(private router: Router, private service: TecnicoService, private route: ActivatedRoute){

}
  ngOnInit(){
    this.idtecnico = this.route.snapshot.paramMap.get('id')!
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
    this.router.navigate(['tecnicos'])
  }

  findById(){
    this.service.findByID(this.idtecnico).subscribe(
      (resposta) => {
          this.tecnico = resposta;
      })
  }

  update(): void {
    this.service.update(this.tecnico, this.idtecnico).subscribe({
      next: (resposta) => {
        this.service.openSnackBar('Tecnico alterado com sucesso');
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

}
