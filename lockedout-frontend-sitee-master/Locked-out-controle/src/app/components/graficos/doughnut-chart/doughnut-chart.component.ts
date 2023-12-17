import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

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

    await this.dashboardService.doughnutData(u).subscribe(data => {
      data.forEach(dado => {
        this.label.push(dado.horario + "");
        this.dados.push(dado.total);
      })
    })
     
     setTimeout(() => {
       this.createChartDougnut();
     }, 400)
   } 

  public chart: any;

  async createChartDougnut() {
    this.chart = new Chart("Doughnut", {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Sales',
          data: this.dados,
          backgroundColor: ['rgb(187, 225, 250)', 'rgb(50, 130, 184)', 'rgb(15, 76, 117)', 'rgb(27, 38, 44)' ], // Cores de fundo das fatias
          borderColor: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'], // Cores da borda das fatias
          borderWidth: 1.2, // Largura da borda das fatias
        }]
      },
      options: {
        aspectRatio: 1.5,
        cutout: '50%',
        animation: {
          animateScale: true, 
          animateRotate: true, 
        },
      }
    });
  }
}


