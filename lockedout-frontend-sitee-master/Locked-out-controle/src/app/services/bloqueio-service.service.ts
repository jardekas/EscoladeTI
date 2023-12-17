import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloqueioRespostaDTO } from '../util/dto/bloqueio/bloqueio-resposta-dto';
import { Observable } from 'rxjs';
import { UserLoginInfoDTO } from '../util/dto/user-login-info-dto';
import { BloqueioDTO } from '../util/dto/bloqueio/bloqueio-dto';
import { BloqueioDeleteDTO } from '../util/dto/bloqueio/bloqueio-delete-dto';
import { UpdateBloqueioDTO } from '../util/dto/bloqueio/update-bloqueio-dto';

@Injectable()
export class BloqueioServiceService {

  user = new UserLoginInfoDTO();
  
  private bloqueioURLs : string;

  constructor(private http : HttpClient) {
    this.bloqueioURLs = 'http://localhost:8080/bloqueio';
  }

  public findAll() : Observable<BloqueioRespostaDTO[]>{
    this.bloqueioURLs = 'http://localhost:8080/bloqueio/findOne';
    this.user.idUser = 1;
    return this.http.post<BloqueioRespostaDTO[]>(this.bloqueioURLs,this.user);
  }

  public addBloqueio(bloqueio : BloqueioDTO){
    this.bloqueioURLs = 'http://localhost:8080/bloqueio/add';
    let resposta = this.http.post<BloqueioDTO>(this.bloqueioURLs, bloqueio).subscribe();
    return resposta;
  }

  public deleteBloqueio(idBloqueio : BloqueioDeleteDTO){
    this.bloqueioURLs = 'http://localhost:8080/bloqueio/delete';
    let resposta = this.http.post<BloqueioDeleteDTO>(this.bloqueioURLs, idBloqueio).subscribe();
    return resposta;
  }

  public updateBloqueio(update : UpdateBloqueioDTO){
    this.bloqueioURLs = 'http://localhost:8080/bloqueio/update';
    let resposta = this.http.post<BloqueioDeleteDTO>(this.bloqueioURLs, update).subscribe();
    return resposta;
  }
}
