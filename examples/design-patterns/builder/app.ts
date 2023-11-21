import { StandardHouseBuilder, House, HouseDirector, LargeHouseBuilder } from './house';

const standardHouseDirector = new HouseDirector(new StandardHouseBuilder());
const largeHouseDirector = new HouseDirector(new LargeHouseBuilder());

const community: House[] = [
    standardHouseDirector.buildBasicHouse(),
    standardHouseDirector.buildLuxuryHouse(),
    largeHouseDirector.buildBasicHouse(),
    largeHouseDirector.buildLuxuryHouse()
];

console.log(community);
