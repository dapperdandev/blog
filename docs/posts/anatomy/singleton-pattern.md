---
title: Singleton Pattern
description: An overview of the Singleton design pattern
date: 2026-03-07
tags:
  - design-patterns
  - typescript
  - architecture
---

## Introduction

The Singleton pattern restricts the instantiation of a class to a single
instance and provides a global point of access to it. It is useful when exactly
one object is needed to coordinate actions across the system.

## Example

The example below demonstrates a simple implementation of the singleton pattern
to create a counter.

```typescript
class Counter {
  private static instance: Counter;
  private _count: number;

  private constructor() {
    this._count = 0; // Initialize the count to 0 to prevent errors when incrementing
  }

  public static getInstance(): Counter {
    if (!Counter.instance) {
      Counter.instance = new Counter();
    }
    return Counter.instance;
  }

  public increment(): void {
    this._count++;
  }

  public getCount(): number {
    return this._count;
  }
}
```

## Dissection

### Private Static Variable

A private static variable that holds the single instance of the class.

```typescript
private static instance: Counter;
```

### Private Constructor

A private constructor to prevent direct instantiation of the class from outside.

```typescript
private constructor() {
    this._count = 0; // Initialize the count to 0 to prevent errors when incrementing
}
```

### Public Static Access Method

A public static method (often named `getInstance()`) that returns the single
instance of the class, creating it if it doesn't already exist.

```typescript
public static getInstance(): Counter {
    if (!Counter.instance) {
        Counter.instance = new Counter();
    }
    return Counter.instance;
}
```

## Usage

```typescript
const counter1 = Counter.getInstance();
counter1.increment();
counter1.increment();

const counter2 = Counter.getInstance();
counter2.increment();
counter2.increment();

console.log(counter1.getCount()); // Output: 4
console.log(counter2.getCount()); // Output: 4
```

Notice how both `counter1` and `counter2` reference the same instance, so
incrementing one affects the other. Both `counter1.getCount()` and
`counter2.getCount()` return the same value.
