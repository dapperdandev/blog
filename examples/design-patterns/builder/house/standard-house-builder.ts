import { House } from './house';
import { HouseBuilder } from './house-builder';

export class StandardHouseBuilder implements HouseBuilder {
    private bedroomCount: number;
    private bathroomCount: number;
    private squareFeet: number;
    private hasGarage: boolean = false;
    private hasSwimmingPool: boolean = false;

    constructor() {
        this.bedroomCount = 3;
        this.bathroomCount = 2;
        this.squareFeet = 1500;
    }

    public withGarage(): HouseBuilder {
        this.hasGarage = true;
        return this;
    }

    public withSwimmingPool(): HouseBuilder {
        this.hasSwimmingPool = true;
        return this;
    }

    public build(): House {
        return new House(
            this.bedroomCount,
            this.bathroomCount,
            this.squareFeet,
            this.hasGarage,
            this.hasSwimmingPool
        );
    }
}
