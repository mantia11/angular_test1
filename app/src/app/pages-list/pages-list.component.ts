import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { IFlight } from '../models/flight';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'pages-list',
  styleUrls: ['pages-list.component.less'],
  templateUrl: 'pages-list.component.html',
})
export class PagesListComponent implements OnInit {
  flights: IFlight[];
  selectedId: number;

  @Output() readonly mapRefresh: EventEmitter<number> = new EventEmitter();
  @Output() readonly closeNav = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.selectedId = 0;
    this.dataService.getFlights().subscribe((data: IFlight[]) => {
      this.flights = data;
    });
  }

  delete(id: number): void {
    this.flights = this.flights.filter((item: IFlight) => item.id !== id);
    this.dataService.deleteById(id);
    if (this.selectedId === id) {
      this.mapRefresh.emit(id);
      this.selectedId = 0;
    }
  }

  navigateTo(id: number): void {
    this.selectedId = id;
    this.mapRefresh.emit(id);           // better to use pubSubService or routing
    this.closeNav.emit(true);
  }
}
