import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autorizadoGuard } from './util/guard/autorizado.guard';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { BloquearUrlComponent } from './components/bloquear-url/bloquear-url.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { NaoLogadoComponent } from './components/nao-logado/nao-logado.component';
import { menuGuard } from './components/menu/menu.service.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tela-inicial'
  },

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'tela-inicial',
    component: TelaInicialComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'historico',
    component: HistoricoComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'bloquear-url',
    component: BloquearUrlComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'nao-logado',
    component: NaoLogadoComponent,
    canActivate: [menuGuard]
  },
  
  {
    path: 'log-out',
    component: LogOutComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'aut',
    component:AutenticacaoComponent,
    canActivate: [menuGuard]
  },

  {
    path: '**',
    redirectTo: 'tela-inicial'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



