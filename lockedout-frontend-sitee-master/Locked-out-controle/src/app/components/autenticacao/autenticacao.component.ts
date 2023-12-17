import { Component, OnInit } from '@angular/core';
import { autorizadoGuard } from '../../util/guard/autorizado.guard'
@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})

export class AutenticacaoComponent implements OnInit {

  constructor(private autorizadoGuard: autorizadoGuard) { }

  ngOnInit(): void {
    this.autorizadoGuard.enable();
    window.location.replace("/tela-inicial")
  }
}
