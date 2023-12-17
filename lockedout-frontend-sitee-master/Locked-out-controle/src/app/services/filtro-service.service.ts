import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltroDTO } from '../util/dto/filtro/filtro-dto';
import { HistoricoEnvioDTO } from '../util/dto/historico/historico-envio-dto';
import { BloqueioRespostaDTO } from '../util/dto/bloqueio/bloqueio-resposta-dto';

@Injectable({
  providedIn: 'root'
})
export class FiltroServiceService {
  
  private historicoURLs : string;

  constructor(private http : HttpClient) {
    this.historicoURLs = 'http://localhost:8080/filtro';
  }

  public filtroHistorico(envio : Array<FiltroDTO>) : Observable<HistoricoEnvioDTO[]>{
    this.historicoURLs = 'http://localhost:8080/filtro/historico';
    return this.http.post<HistoricoEnvioDTO[]>(this.historicoURLs, envio);
  }

  public filtroBloqueio(envio : FiltroDTO) : Observable<BloqueioRespostaDTO[]>{
    this.historicoURLs = 'http://localhost:8080/filtro/bloqueio';
    return this.http.post<BloqueioRespostaDTO[]>(this.historicoURLs, envio);
  }

}
