import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  flightId: number = 0;
  mode = new FormControl('over');

  selectFlight(id: number): void {
    this.flightId = id;
  }
}
