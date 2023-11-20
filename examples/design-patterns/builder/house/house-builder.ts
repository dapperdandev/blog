import { House } from './house';

export interface HouseBuilder {
    addGarage(): HouseBuilder;
    addSwimmingPool(): HouseBuilder;
    configureHeatSource(): HouseBuilder;
    build(): House;
}
