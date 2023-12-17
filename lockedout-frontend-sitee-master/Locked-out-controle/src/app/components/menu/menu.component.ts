import {Component, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {navbarData} from './nav-data';

interface MenuNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onToggleMenuNav: EventEmitter<MenuNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleMenuNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  ngOnInit(): void{
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleMenuNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeMenu(): void {
    this.collapsed = false
    this.onToggleMenuNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
