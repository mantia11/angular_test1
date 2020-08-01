import { Component } from '@angular/core';

@Component({
  selector: 'pages-list',
  templateUrl: 'pages-list.component.html',
})
export class PagesListComponent {
  typesOfShoes: string[] = ['New', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
