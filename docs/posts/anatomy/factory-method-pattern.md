---
title: Factory Method Pattern
description: An overview of the Factory Method design pattern
date: 2026-07-30
tags:
  - design-patterns
  - typescript
  - creational
---

## Introduction

The Factory Method pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. This pattern promotes loose coupling by eliminating the need to bind application-specific classes into the code.

## Example
```typescript
// -- Product ------------------------------------------
interface Coffee {
    name: string;
    ounces: number;
    caffeineMg: number;
}

// -- Concrete Products --------------------------------
class Espresso implements Coffee {
    name: string = 'espresso';
    ounces: number = 1;
    caffeineMg: number = 64;
}

class ColdBrew implements Coffee {
    name: string = 'cold brew';
    ounces: number = 12;
    caffeineMg: number = 200;
}

// -- Creator ------------------------------------------
abstract class CoffeeStand {
    cupsServed = 0;

    abstract brew(): Coffee;

    serve(): Coffee {
        const cup = this.brew();
        this.cupsServed++;
        return cup;
    }
}

// -- Concrete Creators --------------------------------
class EspressoBar extends CoffeeStand {
    brew(): Coffee {
        return new Espresso();
    }
}

class ColdBrewCart extends CoffeeStand {
    brew(): Coffee {
        return new ColdBrew();
    }
}
```


## Dissection

### Product
The `Coffee` interface defines the structure of the product that the factory method will create. It ensures that all concrete products share a common set of properties, promoting consistency and interchangeability.

### Concrete Product

Concrete products like `Espresso` and `ColdBrew` implement the `Coffee` interface. They provide specific implementations of the product, encapsulating the details of their creation and ensuring they conform to the expected structure.

### Creator

The `CoffeeStand` abstract class defines the factory method `brew()`, which must be implemented by concrete creators. It also provides a `serve()` method that uses the factory method to create and serve coffee, keeping track of the number of cups served.

### Concrete Creator

Concrete creators like `EspressoBar` and `ColdBrewCart` implement the `brew()` method to create specific types of coffee. This allows the client code to work with the abstract `CoffeeStand` interface while the actual product creation is delegated to the concrete creators.

## Usage

```typescript
const bar = new EspressoBar();
const cart = new ColdBrewCart();

console.log(bar.serve());
console.log(cart.serve());
console.log(bar.cupsServed, cart.cupsServed);
```
