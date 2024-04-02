import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  menuItems: MegaMenuItem[];

  constructor() {
    this.menuItems = [
      {label: 'Home', routerLink: ['/home']},
      {label: 'About', routerLink: ['/about']},
    ];
  }
}
