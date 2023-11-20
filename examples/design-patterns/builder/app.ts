import {
    ClassicHouseBuilder,
    House,
    HouseConstructionDirector,
    PremiereHouseBuilder
} from './house';

const premiereHouseDirector = new HouseConstructionDirector(new PremiereHouseBuilder());
const classicHouseDirector = new HouseConstructionDirector(new ClassicHouseBuilder());

const community: House[] = [
    premiereHouseDirector.constructHouse(),
    classicHouseDirector.constructHouse(),
    classicHouseDirector.constructHouse()
];

console.log(community);
