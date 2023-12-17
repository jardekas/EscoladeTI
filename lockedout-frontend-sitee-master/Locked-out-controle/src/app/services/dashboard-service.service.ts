import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarCharDTO } from '../util/dto/dashboard/bar-char-dto';
import { UserLoginInfoDTO } from '../util/dto/user-login-info-dto';
import { DoughnutDTO } from '../util/dto/dashboard/doughnut-dto';
import { CardDTO } from '../util/dto/dashboard/card-dto';
import { BarChartVerticalDTO } from '../util/dto/dashboard/bar-chart-vertical-dto';
import { LineCharDTO } from '../util/dto/dashboard/line-char-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private configuracoesURLs: string;

  constructor(private http: HttpClient) {
    this.configuracoesURLs = 'http://localhost:8080/dashboard';
  }

  public barChartData(user: UserLoginInfoDTO) : Observable<BarCharDTO[]>{
    this.configuracoesURLs = 'http://localhost:8080/dashboard/bar-chart';
    return this.http.post<BarCharDTO[]>(this.configuracoesURLs, user);
  }

  public doughnutData(user: UserLoginInfoDTO) : Observable<DoughnutDTO[]>{
    this.configuracoesURLs = 'http://localhost:8080/dashboard/doughnut-chart';
    return this.http.post<DoughnutDTO[]>(this.configuracoesURLs, user);
  }


  public cardData(user: UserLoginInfoDTO) : Observable<CardDTO>{
    this.configuracoesURLs = 'http://localhost:8080/dashboard/card';
    return this.http.post<CardDTO>(this.configuracoesURLs, user);
  }

  public barChartVerticalData(user: UserLoginInfoDTO) : Observable<BarChartVerticalDTO[]> {
    this.configuracoesURLs = 'http://localhost:8080/dashboard/bar-chart-vertical';
    return this.http.post<BarChartVerticalDTO[]>(this.configuracoesURLs, user);
  }


  public lineChartData(user: UserLoginInfoDTO) : Observable<LineCharDTO[]>{
    this.configuracoesURLs = 'http://localhost:8080/dashboard/line-chart';
    return this.http.post<LineCharDTO[]>(this.configuracoesURLs, user);
  }
}
