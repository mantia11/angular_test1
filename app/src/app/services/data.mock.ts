// The initial data got from database
import { IFlight } from '../models/flight';

export const flights: IFlight[] = [{
  id: 1,
  name: 'My first test',
  path: [{ lat: 47.057722, lng: 8.313216},
    {lat: 47.049629, lng: 8.363630},
    {lat: 47.021468, lng: 8.332204}]
}, {
  id: 2,
  name: 'Bürgenstock',
  path: [{ lat: 46.999937, lng: 8.400220},
    {lat: 47.015441, lng: 8.447768},
    {lat: 47.021838, lng: 8.397727},
    {lat: 47.012727, lng: 8.360727}]
}];
