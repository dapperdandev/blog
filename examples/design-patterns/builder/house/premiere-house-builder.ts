import { House } from './house';
import { HouseBuilder } from './house-builder';

export class PremiereHouseBuilder implements HouseBuilder {
    private house: House;

    constructor() {
        const bedroomCount: number = 5;
        const bathroomCount: number = 4;
        const floorCount: number = 3;
        const squareFeet: number = 3500;

        this.house = new House(bedroomCount, bathroomCount, floorCount, squareFeet);
    }

    public addGarage(): HouseBuilder {
        this.house.hasGarage = true;
        return this;
    }

    public addSwimmingPool(): HouseBuilder {
        this.house.hasSwimmingPool = true;
        return this;
    }

    public configureHeatSource(): HouseBuilder {
        this.house.heating = 'gas';
        return this;
    }

    public build(): House {
        return this.house;
    }
}
