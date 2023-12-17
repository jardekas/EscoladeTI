import { Component } from '@angular/core';

interface MenuNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;

  isMenuNavCollapsed = false;
  screenWidth = 0;

  constructor(){
    this.title = "Locked-Out"
  }

  onToggleMenuNav(data: MenuNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isMenuNavCollapsed = data.collapsed;
  }

  static menuVisibility():void{
    document.getElementById("menu-nav")?.style.setProperty('visibility','hidden')
  }
}
