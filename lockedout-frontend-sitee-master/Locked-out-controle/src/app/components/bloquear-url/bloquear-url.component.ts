import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BloqueioServiceService } from 'src/app/services/bloqueio-service.service';
import { BloqueioRespostaDTO } from 'src/app/util/dto/bloqueio/bloqueio-resposta-dto';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BloqueioDTO } from 'src/app/util/dto/bloqueio/bloqueio-dto';
import { BloqueioDeleteDTO } from 'src/app/util/dto/bloqueio/bloqueio-delete-dto';
import { UpdateBloqueioDTO } from 'src/app/util/dto/bloqueio/update-bloqueio-dto';
import { FiltroDTO } from 'src/app/util/dto/filtro/filtro-dto';
import { FiltroServiceService } from 'src/app/services/filtro-service.service';


let service: BloqueioServiceService;
let idBloqueio: number;
let bloqueios: BloqueioRespostaDTO[];
let bloqueio: BloqueioRespostaDTO;
let timer: number;

@Component({
  selector: 'bloquear-url',
  templateUrl: './bloquear-url.component.html',
  styleUrls: ['./bloquear-url.component.scss'],
})

export class BloquearUrlComponent implements OnInit {
  bloqueios = bloqueios
  idBloqueio !: number;
  url !: string;
  horarioInicio !: string;
  horarioFim !: string;
  name: any;
  animal: any;

  constructor(private bloqueioService: BloqueioServiceService, public dialog: MatDialog, 
    private filtroService: FiltroServiceService) {
    bloqueios = new Array;
    service = bloqueioService;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { url: this.url },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.url = result;
    });
  }

  openDialogUpdate(b: BloqueioRespostaDTO): void {
    bloqueio = b

    const dialogRef = this.dialog.open(DialogOverviewUpdate, {
      data: { url: this.url },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.url = result;
    });
  }

  ngOnInit() {
    this.bloqueioService.findAll().subscribe(data => {
      bloqueios = data;
      this.bloqueios = bloqueios
    });
  }

  deleteBloqueio(id: number) {
    let resposta = new BloqueioDeleteDTO()
    resposta.idBloqueio = id;
    this.bloqueioService.deleteBloqueio(resposta)
    window.location.reload()
  }



  displayedColumns: string[] = ['tag', 'url', 'data', 'horario', 'editar', 'delete'];
  dataSource = [bloqueios];
  datSource = new MatTableDataSource<BloqueioRespostaDTO>(bloqueios);

  @ViewChild(MatTable) table!: MatTable<BloqueioRespostaDTO>;


  time(event: Event) {

    clearTimeout(timer);

    timer = setTimeout((e: number) => {
      const inputValue = (event.target as HTMLInputElement).value;
      console.log(inputValue);
      
      let envio : FiltroDTO = new FiltroDTO();
      envio.filtro = inputValue;

      this.filtroService.filtroBloqueio(envio).subscribe(data => {
        bloqueios = data;
        this.bloqueios = bloqueios
      });
    }, 2000);

  }

  applyFilter(event: Event) {
    let valor = this.time(event);
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./bloquear-url.component.scss'],
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,) { }

  onClick(): void {
    let htmlURL = document.getElementById("url") as HTMLInputElement
    let url = htmlURL?.value

    let htmlHoraInicio = document.getElementById("tempoInicio") as HTMLInputElement
    let horaInicio = htmlHoraInicio?.value

    let htmlHoraFim = document.getElementById("tempoFim") as HTMLInputElement
    let horaFim = htmlHoraFim?.value

    let htmlDiaInicio = document.getElementById("dataInicio") as HTMLInputElement
    let diaInicio = htmlDiaInicio?.value
    const dateInicio = new Date(diaInicio)

    let htmlDiaFim = document.getElementById("dataFim") as HTMLInputElement
    let diaFim = htmlDiaFim?.value
    const dateFim = new Date(diaFim)


    dateFim.setDate(dateFim.getDate()+1)
    dateInicio.setDate(dateInicio.getDate()+1)

    let resposta = new BloqueioDTO()

    if (url) {
      resposta.idUser = 1;
      resposta.url = url;
      resposta.tempoInicio = horaInicio;
      resposta.tempoFim = horaFim;
      resposta.diaInicio = dateInicio;
      resposta.diaFim = dateFim;

      service.addBloqueio(resposta);
    }
    else {
      alert("Bloqueio não salvo!")
    }

    window.location.reload()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-content-update',
  templateUrl: './dialog-content-update.html',
  styleUrls: ['./bloquear-url.component.scss'],
})

export class DialogOverviewUpdate {

  bloqueios = bloqueios
  b = bloqueio;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,) { }

  onClick(): void {
    let htmlURL = document.getElementById("url") as HTMLInputElement
    let url = htmlURL?.value

    let htmlHoraInicio = document.getElementById("tempoInicio") as HTMLInputElement
    let horaInicio = htmlHoraInicio?.value

    let htmlHoraFim = document.getElementById("tempoFim") as HTMLInputElement
    let horaFim = htmlHoraFim?.value

    let htmlDiaInicio = document.getElementById("dataInicio") as HTMLInputElement
    let diaInicio = htmlDiaInicio?.value
    const dateInicio = new Date(diaInicio)

    let htmlDiaFim = document.getElementById("dataFim") as HTMLInputElement
    let diaFim = htmlDiaFim?.value
    const dateFim = new Date(diaFim)

    dateFim.setDate(dateFim.getDate()+1)
    dateInicio.setDate(dateInicio.getDate()+1)


    let resposta = new UpdateBloqueioDTO()
    let passou: boolean = false

    if (url || horaInicio || horaFim || diaInicio || diaFim)
      passou = true;

    if (passou) {
      resposta.idBloqueio = bloqueio.idBloqueio;

      if (url)
        resposta.url = url;
      if (horaInicio)
        resposta.tempoInicio = horaInicio;
      if (horaFim)
        resposta.tempoFim = horaFim;
      if (diaInicio)
        resposta.diaInicio = dateInicio;
      if (diaFim)
        resposta.diaFim = dateFim;

      service.updateBloqueio(resposta);
    }
    else {
      alert("Bloqueio não salvo!")
    }
    window.location.reload()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}