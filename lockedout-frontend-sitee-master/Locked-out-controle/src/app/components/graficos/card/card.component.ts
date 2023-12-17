import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';
import { CardDTO } from 'src/app/util/dto/dashboard/card-dto';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';

@Component({
  selector: 'app-site-com-mais-acessos-etempo',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class SiteComMaisAcessosETempoComponent implements OnInit{

  dados : CardDTO;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardServiceService) {
      this.dados = new CardDTO();
  }

  async ngOnInit() {
    var u = new UserLoginInfoDTO();
    u.idUser = 1;

    await this.dashboardService.cardData(u).subscribe(data => {
      this.dados = data;
    })
  } 
}
