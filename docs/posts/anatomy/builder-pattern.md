---
title: Builder Pattern
description: An overview of the Builder design pattern
date: 2026-07-30
tags:
  - design-patterns
  - typescript
  - creational
---

## Introduction

The Builder pattern simplifies the construction of complex objects. It often solves the telescoping constructor anti-pattern, where a class's parameters increase in number and complexity. The builder pattern allows for step-by-step construction of an object.

## Example
```typescript
// -- Product ------------------------------------------
type Bread = 'white' | 'wheat' | 'rye';
type Cheese = 'cheddar' | 'swiss';

class Sandwich {
    bread: Bread = 'white';
    cheese: Cheese | null = null;
    toppings: string[] = [];
    toasted: boolean = false;
}

// -- Builder Interface --------------------------------
interface SandwichBuilder {
    reset(): this;
    setBread(bread: Bread): this;
    setCheese(cheese: Cheese): this;
    addTopping(topping: string): this;
    toast(): this;
    build(): Sandwich;
}

// -- Concrete Builder ---------------------------------
class DeliSandwichBuilder implements SandwichBuilder {
    private sandwich: Sandwich = new Sandwich();

    reset(): this {
        this.sandwich = new Sandwich();
        return this;
    }

    setBread(bread: Bread): this {
        this.sandwich.bread = bread;
        return this;
    }

    setCheese(cheese: Cheese): this {
        this.sandwich.cheese = cheese;
        return this;
    }

    addTopping(topping: string): this {
        this.sandwich.toppings.push(topping);
        return this;
    }

    toast(): this {
        this.sandwich.toasted = true;
        return this;
    }

    build(): Sandwich {
        const sandwich = this.sandwich;
        this.reset();
        return sandwich;
    }
}

// -- Director -----------------------------------------
class SandwichArtist {
    private builder: SandwichBuilder;

    constructor(builder: SandwichBuilder) {
        this.builder = builder;
    }

    makeGrilledCheese(): Sandwich {
        this.builder.reset();
        return this.builder
            .setBread('white')
            .setCheese('cheddar')
            .toast()
            .build();
    }

    makeClubSandwich(): Sandwich {
        this.builder.reset();

        return this.builder
            .setBread('wheat')
            .setCheese('swiss')
            .addTopping('turkey')
            .addTopping('bacon')
            .toast()
            .build();
    }
}
```
## Dissection

### The Product

The complex object that is being built/constructed. A product can exist without a builder. The builder is simply a way to construct the product in a step-by-step manner. Usually, the builder pattern comes in when a product becomes too complex to construct via other means.

### Builder Interface

Just like any interface, the builder interface is the contract that concrete builders implement.

#### Requirements
- A step for each part of the product a caller may want to set.

### Concrete Builder

Concrete builders provide the actual implementation for building the product. They are responsible for creating and assembling the parts of the product. Each concrete builder can create a different representation of the product.

#### Requirements
- Implements the builder interface.
- Has a private instance of the product being built.
- Provides the method that returns the product (`build()` here).
- Resets the product after returning it, so that the builder can be reused.

### Director (optional)

The director abstracts away the construction process. It knows the order to call the builder methods to construct a specific product.

#### Requirements
- The constructor takes the builder as an argument.
- Each method calls `reset()` before building a new product. This ensures a clean state.
- Each method calls the builder methods in a specific order to construct a particular product.

### Fluent API

Optional. Allows for method chaining by returning the builder instance (`this`) from each method, which makes the code more readable and expressive.

## Usage

The client can drive the builder itself for a one-off order:

```typescript
const deliSandwichBuilder = new DeliSandwichBuilder();

const pastramiOnRye = deliSandwichBuilder
    .setBread('rye')
    .addTopping('pastrami')
    .build();
```

Or hand it to a director and order off the menu:

```typescript
const sandwichArtist = new SandwichArtist(deliSandwichBuilder);

const grilledCheese = sandwichArtist.makeGrilledCheese();
const clubSandwich = sandwichArtist.makeClubSandwich();
```

The same builder serves both, because `build()` resets it.
