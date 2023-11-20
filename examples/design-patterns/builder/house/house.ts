export class House {
    public bedroomCount: number;
    public bathroomCount: number;
    public floorCount: number;
    public squareFeet: number;

    public hasGarage: boolean;
    public hasSwimmingPool: boolean;
    public heating: 'electric' | 'gas' | 'oil' | 'none' = 'none';

    constructor(
        bedroomCount: number,
        bathroomCount: number,
        floorCount: number,
        squareFeet: number,
        hasGarage: boolean = false,
        hasSwimmingPool: boolean = false,
        heating: 'electric' | 'gas' | 'oil' | 'none' = 'none'
    ) {
        this.bedroomCount = bedroomCount;
        this.bathroomCount = bathroomCount;
        this.floorCount = floorCount;
        this.hasGarage = hasGarage;
        this.hasSwimmingPool = hasSwimmingPool;
        this.squareFeet = squareFeet;
        this.heating = heating;
    }
}
