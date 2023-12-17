import { Component} from '@angular/core';
import { BloqueioServiceService } from 'src/app/services/bloqueio-service.service';
import { FiltroServiceService } from 'src/app/services/filtro-service.service';
import { HistoricoServiceService } from 'src/app/services/historico-service.service';
import { BloqueioDTO } from 'src/app/util/dto/bloqueio/bloqueio-dto';
import { FiltroDTO } from 'src/app/util/dto/filtro/filtro-dto';
import { HistoricoEnvioDTO } from 'src/app/util/dto/historico/historico-envio-dto';

let timer: number;

export interface UserData {
  date: string;
  url: string;
  title: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {

  historicos: HistoricoEnvioDTO[];

  constructor(private historicoService: HistoricoServiceService, private bloqueioService: BloqueioServiceService,
    private filtroService : FiltroServiceService) {
    this.historicos = new Array;
  }

  ngOnInit() {
    this.historicoService.findAll().subscribe(data => {
      this.historicos = data;
    });
  }

  bloquearHistorico(url : string){
    let bloqueio = new BloqueioDTO();
    
    bloqueio.idUser = 1;
    bloqueio.url = url;
    bloqueio.tempoFim="";
    bloqueio.tempoInicio="";

    this.bloqueioService.addBloqueio(bloqueio);
    window.location.reload()
  }

  time(event: Event) {

    clearTimeout(timer);

    timer = setTimeout((e: number) => {
      const inputValue = (event.target as HTMLInputElement).value.toUpperCase();
      console.log(inputValue);

      let envio : FiltroDTO[] = [];
      let dado : FiltroDTO = new FiltroDTO;
      dado.filtro = inputValue;
      envio.push(dado);

      this.filtroService.filtroHistorico(envio).subscribe(data => {
        this.historicos = data;
        console.log(this.historicos)
      });
    }, 2000);
  }

  applyFilter(event: Event) {

    this.time(event);

    if (timer === 0) {

    }
  }
}

