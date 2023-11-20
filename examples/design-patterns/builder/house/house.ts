export class House {
    public bedroomCount: number;
    public bathroomCount: number;
    public squareFeet: number;

    public hasGarage: boolean;
    public hasSwimmingPool: boolean;

    constructor(
        bedroomCount: number,
        bathroomCount: number,
        squareFeet: number,
        hasGarage: boolean = false,
        hasSwimmingPool: boolean = false
    ) {
        this.bedroomCount = bedroomCount;
        this.bathroomCount = bathroomCount;
        this.squareFeet = squareFeet;

        this.hasGarage = hasGarage;
        this.hasSwimmingPool = hasSwimmingPool;
    }
}
