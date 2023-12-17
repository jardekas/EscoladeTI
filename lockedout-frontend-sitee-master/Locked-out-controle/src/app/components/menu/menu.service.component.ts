import { CanActivate} from '@angular/router';
import {Injectable} from '@angular/core'
import { MenuComponent } from './menu.component';
import { AppComponent } from 'src/app/app.component';

@Injectable()

export class menuGuard implements CanActivate {

  canActivate(): boolean{
    AppComponent.menuVisibility();
    return true;
  }
}
