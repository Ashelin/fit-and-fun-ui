import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent {

  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Workout',
        icon: 'pi pi-folder',
        items: [
          {label: 'Workout-List', routerLink: '/workouts', icon: 'pi pi-book'},
        ]
      },
    ];
  }
}
