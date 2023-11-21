---
title: The Builder Pattern
subtitle: Design Patterns
slug: builder
seriesSlug: design-patterns
enableToc: true
tags: typescript, design-patterns, builder
domain: dapperdandev.hashnode.dev
saveAsDraft: true
---

## Introduction

The builder pattern is a creational pattern used for the creation of complex objects. Rather than creating an object all at once via a constructor, a builder class is used with methods that build the object one step at a time until a special method is invoked that returns the final object.

## Problem Statement

Consider the House class below:

```typescript
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
```

Despite being a fairly simple class, several arguments are necessary to construct a house object. The complexity is compounded further since constructor arguments are positional in TypeScript.

```typescript
const house = new House(3, 2, 1500, false, true);
```

Note that the value `false` is provided for `hasGarage` despite it being the same as the default value. This is necessary to be able to provide a value for `hasSwimmingPool`.

There are a number of ways to address this problem, some of which will be touched on later in this article. In the meantime, this article will focus on how the builder pattern can be useful in this scenario.

## Key Characteristics

### Product

The object that is being _built_.

### Builder

The class or interface that is responsible for the construction of the product. At a minimum, it should do two things:

1. Expose methods for setting the values that are optional in the product's constructor.
2. Expose a method for returning the final product.

### Concrete Builder(s)

Implementations of the builder class or interface for the construction of a specific product. Put another way, a concrete builder is an opinionated implementation of the base builder class or interface.

### Director

The class that is responsible for the orchestration of the construction of products.

## Implementations

### Simple Builder

Here's a simple implementation of the builder pattern for the House class:

```typescript
export class HouseBuilder {
    private bedroomCount: number;
    private bathroomCount: number;
    private squareFeet: number;

    private hasGarage: boolean = false;
    private hasSwimmingPool: boolean = false;

    constructor(bedroomCount: number, bathroomCount: number, squareFeet: number) {
        this.bedroomCount = bedroomCount;
        this.bathroomCount = bathroomCount;
        this.squareFeet = squareFeet;
    }

    public withGarage(hasGarage: boolean): void {
        this.hasGarage = hasGarage;
    }

    public withSwimmingPool(hasSwimmingPool: boolean): void {
        this.hasSwimmingPool = hasSwimmingPool;
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
```

In this implementation, the constructor accepts the required arguments for the product, exposes methods for settings the optional values, and exposes a method for returning the final product.

> ℹ️ Does this work? If it does, add details about private house vs private props.

```typescript
const builder = new HouseBuilder(3, 2, 1500);
builder.withSwimmingPool(true);

const house = builder.build();
```

Note that the same house object is being created as in the previous example, however, the optional arguments are now set via methods on the builder class, eliminating the need provide values when the defaults are desired.

### Applying the Fluent Syntax (Method Chaining)

A common improvement applied to the builder pattern is enabling method chaining, also known as fluent syntax. This is accomplished by returning `this` in the methods that should be chainable. (`build()` still returns the final product).

```typescript
export class HouseBuilder {
    ...

    public withGarage(hasGarage: boolean): HouseBuilder {
        this.hasGarage = hasGarage;
        return this;
    }

    public withSwimmingPool(hasSwimmingPool: boolean): HouseBuilder {
        this.hasSwimmingPool = hasSwimmingPool;
        return this;
    }

    ...
}
```

```typescript
const builder = new HouseBuilder(3, 2, 1500);
const house = builder.withSwimmingPool(true).build();
```

### Adding Concrete Builders

Lorem ipsum...

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

## TODO
- [] The builder pattern is not simply a complex named argument solution
- [] The builder pattern is not simply a way to identify the parameters of a constructor
- [] The builder pattern _does_ prevent the telescoping constructor anti-pattern
- [] Immutability
````
