import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginInfoDTO } from '../util/dto/user-login-info-dto';
import { PerfilDTO } from '../util/dto/perfil/perfil-dto';

@Injectable({
  providedIn: 'root'
})
export class PerfilServiceService {
  private perfilURLs : string
  private body : UserLoginInfoDTO = new UserLoginInfoDTO();

  constructor(private http : HttpClient) {
    this.perfilURLs = 'http://localhost:8080/perfil';
  }

  public findPerfil() : Observable<PerfilDTO>{
    this.perfilURLs = 'http://localhost:8080/perfil/getInfo';
    this.body.idUser = 1;
    console.log(this.body)
    return this.http.post<PerfilDTO>(this.perfilURLs, this.body);
  }
}
