import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLoginInfoDTO } from '../util/dto/user-login-info-dto';
import { UpdateUserDTO } from '../util/dto/configuracao/update-user-dto';
import { FeedbackDTO } from '../util/dto/configuracao/feedback-dto';


@Injectable()
export class ConfiguracoesServiceService {

  user = new UserLoginInfoDTO();

  private configuracoesURLs : string;

  constructor(private http : HttpClient) {
    this.configuracoesURLs = 'http://localhost:8080/configuracao';
  }

  public updateUser(user: UpdateUserDTO) {
    this.configuracoesURLs = 'http://localhost:8080/configuracao/update';
    let resposta = this.http.post<UpdateUserDTO>(this.configuracoesURLs, user).subscribe();
    return resposta;
  }

  public sendFeedback(user: FeedbackDTO){
    this.configuracoesURLs = 'http://localhost:8080/configuracao/feedback';
    let resposta = this.http.post<FeedbackDTO>(this.configuracoesURLs, user).subscribe();
    return resposta;
  }

}
