import { House } from './house';
import { HouseBuilder } from './house-builder';

export class HouseDirector {
    private houseBuilder: HouseBuilder;

    constructor(houseBuilder: HouseBuilder) {
        this.houseBuilder = houseBuilder;
    }

    public buildBasicHouse(): House {
        return this.houseBuilder.build();
    }

    public buildLuxuryHouse(): House {
        return this.houseBuilder.withGarage().withSwimmingPool().build();
    }
}
