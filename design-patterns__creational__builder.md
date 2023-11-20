---
title: Builder
subtitle: Creational Design Patterns
slug: builder
tags: typescript, design-patterns, builder
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1649662225945/7f_c6UxhR.jpg?auto=compress
domain: dapperdandev.hashnode.dev
saveAsDraft: true
---

# Hi
# Builder

## Introduction

A creational pattern that allows the creation of complex objects step by step. It is used to create objects with a lot of parameters and/or with optional parameters.

## Problem Statement

TODO

```typescript
// No builder
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

const house = new House(3, 2, 1, 1500, true, false, 'gas');
// Providing arguments to the House constructor is complex and hard to read/understand.
// Note: Could realistically be solved with named arguments via an object.
```

## Key Terms & Concepts

-   Product - the object that is being built
-   Builder - responsible for the construction of the object
-   Concrete Builder - implements the Builder interface and provides an interface for getting the product
-   Director - responsible for the order of the steps
-   Fluent Syntax - a way of chaining methods to make the code more readable

-   Idempotency - builder methods should be idempotent

## Implementation

Lorem ipsum...

### Simple Builder

Lorem ipsum...

```typescript
export class HouseBuilder {
    private house: House;

    constructor() {
        this.house = new House(0, 0, 0, 0); // Provide values to satisfy the constructor, but leverage the builder to set the values
    }

    public setBedroomCount(count: number): void {
        this.house.bedroomCount = count;
    }

    public setBathroomCount(count: number): void {
        this.house.bathroomCount = count;
    }

    public setFloorCount(count: number): void {
        this.house.floorCount = count;
    }

    public setSquareFeet(count: number): void {
        this.house.squareFeet = count;
    }

    public setHasGarage(hasGarage: boolean): void {
        this.house.hasGarage = hasGarage;
    }

    public setHasSwimmingPool(hasSwimmingPool: boolean): void {
        this.house.hasSwimmingPool = hasSwimmingPool;
    }

    public setHeating(heating: 'electric' | 'gas' | 'oil' | 'none'): void {
        this.house.heating = heating;
    }

    public build(): House {
        return this.house;
    }
}
```

Lorem ipsum...

```typescript
import { HouseBuilder } from './house-builder';

const builder = new HouseBuilder();
builder.setBedroomCount(3);
builder.setBathroomCount(2);
builder.setFloorCount(1);
builder.setSquareFeet(1500);
builder.setHasGarage(true);

const house = builder.build();
```

### Applying the Fluent Syntax (Method Chaining)

Lorem ipsum...

```typescript
// Fluent Builder

export class HouseBuilder {
    private house: House;

    constructor() {
        this.house = new House(0, 0, 0, 0);
    }

    public setBedroomCount(count: number): HouseBuilder {
        this.house.bedroomCount = count;
        return this; // Return the builder to allow for method chaining (fluent syntax).
    }

    ...

    // Other builder methods. All methods should return the builder instance to allow for method chaining (fluent syntax)

    public build(): House {
        return this.house;
    }
}
```

```typescript
const builder = new HouseBuilder();
const house = builder
    .setBedroomCount(3)
    .setBathroomCount(2)
    .setFloorCount(1)
    .setSquareFeet(1500)
    .setHasGarage(true)
    .build();
```

### Adding Concrete Builders

#### Create a HouseBuilder Interface

```typescript
export interface HouseBuilder {
    addGarage(): HouseBuilder;
    addSwimmingPool(): HouseBuilder;
    configureHeatSource(): HouseBuilder;
    build(): House;
}
```

#### Create Concrete Builders

Lorem ipsum...

```typescript
export class ClassicHouseBuilder implements HouseBuilder {
    private house: House;

    constructor() {
        // Prepare default values for the required House constructor arguments.
        const bedroomCount: number = 3;
        const bathroomCount: number = 2;
        const floorCount: number = 2;
        const squareFeet: number = 1900;

        this.house = new House(bedroomCount, bathroomCount, floorCount, squareFeet);
    }

    public addGarage(): HouseBuilder {
        // The concrete builder is preconfigured with default values for the product.
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
```

### Adding a Director

````typescript
export class HouseConstructionDirector {
    private houseBuilder: HouseBuilder;

    constructor(houseBuilder: HouseBuilder) {
        this.houseBuilder = houseBuilder;
    }

    constructHouse(): House {
        return this.houseBuilder.addGarage().addSwimmingPool().configureHeatSource().build();
    }
}
```

## Notes

-   The builder pattern is not simply a complex named argument solution
-   The builder pattern is not simply a way to identify the parameters of a constructor
-   The builder pattern _does_ prevent the telescoping constructor anti-pattern
````

