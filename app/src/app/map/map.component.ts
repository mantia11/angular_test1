import {Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPoint } from '../models/point';
import { appConfig } from '../app-data.config';
import { IFlight } from '../models/flight';
import { PubSubService } from '../services/pubsub.service';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() flightId: number;
  currentFlight: IFlight;
  mapInitPoint: IPoint;

  constructor(private dataService: DataService,
  private pubSubService: PubSubService) { }

  ngOnInit(): void {
    this.mapInitPoint = appConfig.mapInitPoint;
    this.initFlight();

    this.pubSubService.subscribe('mapComponent', this.pubSubService.API.MAP_REFRESH, (id: number) => {
      this.flightId = id;
      this.initFlight();
    });
  }

  ngOnDestroy(): void {
    this.pubSubService.unsubscribe('mapComponent');
  }

  mapClicked($event: any) {
    if (this.flightId) {
      console.log('You cannot add new points to the flight. Just editing existing');
      return;
      // open message dialog
    }
    this.currentFlight.path.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    } as IPoint);
  }

  markerDragEnd(p: IPoint, $event: any) {
    const pathPointIndex = this.currentFlight.path.findIndex((item: IPoint) => item.lat === p.lat && item.lng === p.lng);
    this.currentFlight.path[pathPointIndex] = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
  }

  saveFlight(): void {
    if (!this.flightId && this.currentFlight.path) {
      this.flightId = this.currentFlight.id;
      this.dataService.addFlight(this.currentFlight);
      this.pubSubService.publish(this.pubSubService.API.LIST_UPDATE);
    } else if (this.flightId) {
      this.dataService.saveFlight(this.currentFlight);
    } else {
      console.log('Please add points to the flight!');
      return;
      // open message dialog
    }
  }

  private initFlight(): void {
    if (this.flightId) {
      this.currentFlight = this.dataService.getFlightById(this.flightId);
    } else {
      const newId = this.dataService.getNewId();
      this.currentFlight = {
        id: newId,
        name: `Flight_${newId}`,    // there could be input field to edit title
        path: []
      };
    }
  }
}
