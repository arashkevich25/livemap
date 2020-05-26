import { Coordinates } from './Coordinates';

export interface Pin<CoordsT = Coordinates[]> {
    id: number;
    title: string;
    coords: CoordsT;
}
