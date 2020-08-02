import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { DataService } from '../services/data.service';
import { IFlight } from '../models/flight';
import { EventEmitter } from '@angular/core';
import { PubSubService } from '../services/pubsub.service';

@Component({
  selector: 'pages-list',
  styleUrls: ['pages-list.component.less'],
  templateUrl: 'pages-list.component.html',
})
export class PagesListComponent implements OnInit, OnDestroy {
  flights: IFlight[];
  @Output() readonly closeNav = new EventEmitter();

  constructor(private dataService: DataService,
              private pubSubService: PubSubService) { }

  ngOnInit(): void {
    this.getFlights();

    this.pubSubService.subscribe('listComponent', this.pubSubService.API.LIST_UPDATE, () => {
      this.getFlights();
    });
  }

  ngOnDestroy(): void {
    this.pubSubService.unsubscribe('listComponent');
  }

  delete(id: number): void {
    this.flights = this.flights.filter((item: IFlight) => item.id !== id);
    this.dataService.deleteById(id);
    this.pubSubService.publish(this.pubSubService.API.MAP_REFRESH, 0);
  }

  navigateTo(id: number): void {
    this.pubSubService.publish(this.pubSubService.API.MAP_REFRESH, id);
    this.closeNav.emit(true);
  }

  private getFlights(): void {
    this.dataService.getFlights().subscribe((data: IFlight[]) => {
      this.flights = data;
    });
  }
}
