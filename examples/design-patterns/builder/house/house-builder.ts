import { House } from './house';

export interface HouseBuilder {
    withGarage(): HouseBuilder;
    withSwimmingPool(): HouseBuilder;
    build(): House;
}
