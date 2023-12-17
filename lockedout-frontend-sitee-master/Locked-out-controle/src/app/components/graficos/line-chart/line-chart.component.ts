import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Annotation from 'chartjs-plugin-annotation';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit{

  label : string[];
  dados : number[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardServiceService) {
      this.dados = new Array<number>();
      this.label = new Array<string>();
  }

  async ngOnInit() {
    var u = new UserLoginInfoDTO();
    u.idUser = 1;
    var salvou : Boolean = false;

    await this.dashboardService.lineChartData(u).subscribe(data => {
      

      data.forEach(dado => {
        switch(dado.mes){
          case 1: this.label.push("Janeiro"); break;
          case 2: this.label.push("Fevereiro"); break;
          case 3: this.label.push("Março"); break;
          case 4: this.label.push("Abril"); break;
          case 5: this.label.push("Maio"); break;
          case 6: this.label.push("Junho"); break;
          case 7: this.label.push("Julho"); break;
          case 8: this.label.push("Agosto"); break;
          case 9: this.label.push("Setembro"); break;
          case 10: this.label.push("Outubro"); break;
          case 11: this.label.push("Novembro"); break;
          case 12: this.label.push("Dezembro"); break;
        }
        
        this.dados.push(dado.qtdHoras);
      })
    })
   
   var tempo = setTimeout(() => {
     this.createChartLine();
   }, 400)
 } 

  public chart: any;

  async createChartLine() {
    this.chart = new Chart("Line", {
      type: 'line',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Total Horas',
          data: this.dados,
          fill: false, // Não preencher a área sob a linha
          borderColor: ['rgb(50, 130, 184)'], // Cor da linha
          backgroundColor: 'white', // Cor do interior da barra
          borderWidth: 3, // Largura da linha
        }]
      },
      options: {
        aspectRatio: 2.9,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
