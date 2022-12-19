import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OS } from 'src/app/Models/OS';
import { OsService } from '../../../../services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {


  osid: any;

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    prioridade: '',
    status: ''
  }

  constructor(
    private route: ActivatedRoute,
    private osservice: OsService,
    private router:Router
    ){

  }

  ngOnInit(): void {
      this.osid = this.route.snapshot.paramMap.get('id');
      console.log(this.osid);
      this.findByID(this.osid);
  }

  findByID(id: any):void{
      this.osservice.findByID(id).subscribe(
        resposta => {
          this.os = resposta
        }
      )
  }

  navegateBack() {
        this.router.navigate(['os'])
    }

}
