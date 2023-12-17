import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { autorizadoGuard } from './util/guard/autorizado.guard';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { BloquearUrlComponent } from './components/bloquear-url/bloquear-url.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { MenuComponent } from './components/menu/menu.component';
import { BodyComponent } from './components/body/body.component';
import { NaoLogadoComponent } from './components/nao-logado/nao-logado.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BloqueioServiceService } from './services/bloqueio-service.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfiguracoesServiceService } from './services/configuracoes-service.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { NgChartsModule } from 'ng2-charts';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DoughnutChartComponent } from './components/graficos/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/graficos/line-chart/line-chart.component';
import { BarChartBloqueiosComponent } from './components/graficos/bar-chart/bar-chart.component';
import { BarChartAcessosMesComponent } from './components/graficos/bar-chart-vertical/bar-chart-vertical';
import { SiteComMaisAcessosETempoComponent } from './components/graficos/card/card.component';
import { menuGuard } from './components/menu/menu.service.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    BloquearUrlComponent,
    HistoricoComponent,
    ConfiguracoesComponent,
    MenuComponent,
    BodyComponent,
    NaoLogadoComponent,
    PerfilComponent,
    DoughnutChartComponent,
    LineChartComponent,
    BarChartBloqueiosComponent,
    BarChartAcessosMesComponent,
    SiteComMaisAcessosETempoComponent,
    LogOutComponent,
    AutenticacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgChartsModule,
    MatDividerModule,
    MatDialogModule,
    MatCardModule

  ],
  providers: [
    autorizadoGuard,
    BloqueioServiceService,
    ConfiguracoesServiceService,
    menuGuard,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

