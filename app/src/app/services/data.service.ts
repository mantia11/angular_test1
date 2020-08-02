import { Injectable } from '@angular/core';
import { flights } from './data.mock';
import { IFlight } from '../models/flight';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _flights: IFlight[];

  constructor() {
    this._flights = flights;
  }

  getFlights(): Observable<IFlight[]> {
    // imagine that we get it from backend
    return of(this._flights);
  }

  deleteById(id: number): void {
    this._flights = this._flights.filter((item: IFlight) => item.id !== id);
    // and delete it from DB
  }

  getFlightById(id: number): IFlight {
    return this._flights.find((item: IFlight) => item.id === id);
  }

  getNewId(): number {
    return Math.max(...this._flights.map((item: IFlight) => item.id)) + Date.now();    // or using timestamp or other approach
  }

  addFlight(flight: IFlight): void {
    this._flights.push(flight);
    // and send it to DB
  }

  saveFlight(flight: IFlight): void {
    const pIndex = this._flights.findIndex((item: IFlight) => item.id === flight.id);
    this._flights[pIndex].path = flight.path;
    // and update it in DB
  }
}
