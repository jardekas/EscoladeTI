import { Injectable } from '@angular/core';
import { UserLoginInfoDTO } from '../util/dto/user-login-info-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoEnvioDTO } from '../util/dto/historico/historico-envio-dto';
import { BloqueioRespostaDTO } from '../util/dto/bloqueio/bloqueio-resposta-dto';

@Injectable({
  providedIn: 'root'
})
export class HistoricoServiceService {

  user = new UserLoginInfoDTO();

  private historicoURLs : string;

  constructor(private http : HttpClient) {
    this.historicoURLs = 'http://localhost:8080/historico';
  }

  public findAll() : Observable<HistoricoEnvioDTO[]>{
    this.historicoURLs = 'http://localhost:8080/historico/all';
    this.user.idUser = 1;
    return this.http.post<HistoricoEnvioDTO[]>(this.historicoURLs, this.user);
  }
}
