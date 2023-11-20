import { House } from './house';
import { HouseBuilder } from './house-builder';

export class HouseConstructionDirector {
    private houseBuilder: HouseBuilder;

    constructor(houseBuilder: HouseBuilder) {
        this.houseBuilder = houseBuilder;
    }

    constructHouse(): House {
        return this.houseBuilder.withGarage().withSwimmingPool().build();
    }
}
