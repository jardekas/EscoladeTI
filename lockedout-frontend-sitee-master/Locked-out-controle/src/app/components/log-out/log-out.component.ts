import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { autorizadoGuard } from 'src/app/util/guard/autorizado.guard';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  url !: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { url: this.url },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.url = result;
    });
  }

  async ngOnInit() {
    await window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.openDialog();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./log-out.component.scss'],
})

export class DialogOverviewExampleDialog {

  constructor(private autorizadoGuard: autorizadoGuard, public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private autorizado: autorizadoGuard) {

  }

  onClick(): void {
    this.autorizadoGuard.disable();
    window.location.replace("/tela-inicial")

    this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
