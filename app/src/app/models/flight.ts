import { IPoint } from './point';

export interface IFlight {
  id: number;
  name: string;
  path: IPoint[];
}
