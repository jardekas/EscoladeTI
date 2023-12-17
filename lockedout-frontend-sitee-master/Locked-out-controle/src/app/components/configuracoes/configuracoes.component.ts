import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracoesServiceService } from 'src/app/services/configuracoes-service.service';
import { UpdateUserDTO } from 'src/app/util/dto/configuracao/update-user-dto';
import { HttpClient } from '@angular/common/http';
import { FeedbackDTO } from 'src/app/util/dto/configuracao/feedback-dto';
import { Subscription } from 'rxjs';

var configuracaoServicePopup : ConfiguracoesServiceService;
var updatePopup: UpdateUserDTO;


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }

  onSubmit() {
    configuracaoServicePopup.updateUser(updatePopup);
    this.dialogRef.close();
    alert("Usuario atualizado!")
  }

  closeWindown() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-feedback-dialog.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class DialogElementsExampleDialog { }

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent {

  //DATA TRANSFER OBJECT's
  update: UpdateUserDTO

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private configuracaoService: ConfiguracoesServiceService) {
    this.update = new UpdateUserDTO();
  }

  onSubmitFeedback() {
    let feedbackDTO: FeedbackDTO = new FeedbackDTO();
    let html = document.getElementById("feedback") as HTMLInputElement

    feedbackDTO.feedback = html.value;
    this.configuracaoService.sendFeedback(feedbackDTO);
    this.openDialogFeedback();
  }

  onSubmit() {
    let passou: boolean
    passou = false;

    // INPUT

    let htmlEmail = document.getElementById("email") as HTMLInputElement
    let email = htmlEmail?.value

    let htmlTelefone = document.getElementById("telefone") as HTMLInputElement
    let telefone = htmlTelefone?.value

    // RADIO

    let htmlRadioNotficacao = document.getElementsByName("notificacao");
    let notificacaoSelecionado;
    let valNotf: number;
    let notificacao;


    for (let i = 0; i < htmlRadioNotficacao.length; i++) {
      notificacaoSelecionado = htmlRadioNotficacao[i] as HTMLInputElement
      if (notificacaoSelecionado.checked) {
        notificacao = notificacaoSelecionado.value
        break;
      }

    }

    let htmlRadioSenha = document.getElementsByName("senha");
    let senhaSelecionada;
    let senha;

    for (let i = 0; i < htmlRadioSenha.length; i++) {
      senhaSelecionada = htmlRadioSenha[i] as HTMLInputElement

      if (senhaSelecionada.checked)
        senha = senhaSelecionada.value;
    }

    this.update.idUser = 1;
    this.update.email = email;
    this.update.telefone = telefone;

    if (notificacao != null) {
      var update: number = +notificacao;
      this.update.notificacao = update;
    }

    let valSen = senha === "true" ? true : false;
    this.update.senha = valSen;

    console.log(this.update)
    
    updatePopup = this.update;
    configuracaoServicePopup = this.configuracaoService;

    this.openDialog('0ms', '0ms');
  }

  goBack() {
    this.router.navigate(['/configuracoes']);
  }

  // POPUPS

  name = 'Angular';

  openDialogFeedback() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // limpar o que foi digitado nos inputs
  resetarInputs() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telefoneInput = document.getElementById('telefone') as HTMLInputElement;
    const feedbackInput = document.getElementById('feedback') as HTMLInputElement;

    emailInput.value = '';
    telefoneInput.value = '';
    feedbackInput.value = '';

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
      if (button instanceof HTMLInputElement) {
        button.checked = false;
      }
    });
  }
}


