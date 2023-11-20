import { House } from './house';
import { HouseBuilder } from './house-builder';

export class ClassicHouseBuilder implements HouseBuilder {
    private house: House;

    constructor() {
        const bedroomCount: number = 3;
        const bathroomCount: number = 2;
        const floorCount: number = 2;
        const squareFeet: number = 1900;

        this.house = new House(bedroomCount, bathroomCount, floorCount, squareFeet);
    }

    public addGarage(): HouseBuilder {
        this.house.hasGarage = true;
        return this;
    }

    public addSwimmingPool(): HouseBuilder {
        this.house.hasSwimmingPool = false;
        return this;
    }

    public configureHeatSource(): HouseBuilder {
        this.house.heating = 'electric';
        return this;
    }

    public build(): House {
        return this.house;
    }
}
