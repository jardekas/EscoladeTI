import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';
@Component({
  selector: 'app-bar-chart-acessos-mes',
  templateUrl: './bar-chart-vertical.html',
  styleUrls: ['./bar-chart-vertical.scss']
})
export class BarChartAcessosMesComponent implements OnInit {
  label : string[];
  dados : number[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardServiceService) {
    this.dados = new Array<number>();
    this.label = new Array<string>();
  }
  
  async ngOnInit(){
    var u = new UserLoginInfoDTO();
    u.idUser = 1;

    await this.dashboardService.barChartVerticalData(u).subscribe(data => {
      data.forEach(dado => {
        if(dado.bloquado == true){
          this.label.push("SIM");
        }else this.label.push("NÃO");
        
        this.dados.push(dado.qtdTotal);
      })
    })

    setTimeout(() => {
      this.createChart();
    }, 400)
  }

  public chart: any;

  async createChart() {
    this.chart = new Chart("Vertical", {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: "Bloqueado",
          data: this.dados,
          backgroundColor: ['rgb(50, 130, 184)','rgb(15, 76, 117)'], // Cor de fundo das barras
          borderColor: '1B262C', // Cor da borda das barras
          borderWidth: 1.2, // Largura da borda
        }]
      },
      options: {
        indexAxis: 'y',
        aspectRatio: 2.5
      }
    })
  }

 
}
