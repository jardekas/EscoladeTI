import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilServiceService } from 'src/app/services/perfil-service.service';
import { PerfilDTO } from 'src/app/util/dto/perfil/perfil-dto';
import { UserLoginInfoDTO } from 'src/app/util/dto/user-login-info-dto';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfil : PerfilDTO

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private configuracaoService: PerfilServiceService) {
      this.perfil = new PerfilDTO();
  }

  ngOnInit(){
    this.configuracaoService.findPerfil().subscribe(data=>{
      this.perfil = data;
    })
  }
}
