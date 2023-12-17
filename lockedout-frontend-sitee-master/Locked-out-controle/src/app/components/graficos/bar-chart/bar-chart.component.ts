import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';
import { BarCharDTO } from 'src/app/util/dto/dashboard/bar-char-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-bar-chart-bloqueios',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartBloqueiosComponent implements OnInit {
  label: string[] = []
  dados: number[] = []

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardServiceService) {
    this.dados = new Array<number>();
    this.label = new Array<string>();
  }

  async ngOnInit() {
    var u = new UserLoginInfoDTO();
    u.idUser = 1;

    await this.dashboardService.barChartData(u).subscribe(data => {
      data.forEach(dado => {  
        switch(dado.data){
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
        this.dados.push(dado.total);
      })
    })

    setTimeout(() => {
      this.createChart();
    }, 400)


  }

  public chart: any;

  async createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Total',
          data: this.dados,
          backgroundColor: 'rgb(50, 130, 184)', // Cor de fundo das barras
          borderColor: '1B262C', // Cor da borda das barras
          borderWidth: 1.2, // Largura da borda
        }]
      },
      options: {
        aspectRatio: 2.5 // altura do grafico
      }
    })
  }
}
