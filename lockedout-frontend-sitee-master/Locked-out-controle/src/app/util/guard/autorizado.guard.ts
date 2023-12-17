import { CanActivate, Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core'
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})

export class autorizadoGuard {

  private readonly STORAGE_KEY = 'autorizadoState';

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.loadState();
  }

  private autorizado: boolean = false;

  canActivate(): boolean {
    if (!this.autorizado)
      // Se não estiver autorizado, redireciona para a página "não logado"
      this.router.navigate(['/nao-logado']);

    return this.autorizado;
  }

  enable() {
    this.autorizado = true;
    this.saveState();
  }

  disable() {
    this.autorizado = false;
    this.saveState();
  }

  private saveState() {
    this.localStorageService.setItem(this.STORAGE_KEY, this.autorizado);
  }

  private loadState() {
    const storedState = this.localStorageService.getItem(this.STORAGE_KEY);
    this.autorizado = storedState !== null ? storedState : false;
  }
}
