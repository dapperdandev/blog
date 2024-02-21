# The Builder Pattern

## Structural Design Patterns

Test Update

## Introduction

The builder pattern is a creational pattern used for the creation of complex objects. Rather than creating an object all at once via a constructor, a builder class is used with methods that build the object one step at a time until a special method is invoked that returns the final object.

## Motivation

Consider the `House` class below:

![Motivation for Builder Pattern](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/motivation-for-builder-pattern.png?raw=true)

Despite being a fairly simple class, several arguments are necessary to construct a house object. The complexity is compounded further since constructor arguments are positional in TypeScript.

![Postional Arguments Example](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/positional-arguments.png?raw=true)

Note that the value `false` is provided for `hasGarage` despite it being the same as the default value. This is necessary to be able to provide a value for `hasSwimmingPool`.

There are a number of ways to address this problem, some of which will be covered in another article. In the meantime, this article will focus on how the builder pattern can be useful in this scenario.

## Key Characteristics

### Product

The object that is being _built_.

### Builder

The class or interface that is responsible for the construction of the product. At a minimum, it should do two things:

1. Expose methods for setting the values that are optional in the product's constructor.
2. Expose a method for returning the final product.

### Concrete Builder(s)

Implementations of the builder class or interface for the construction of a specific product. Put another way, a concrete builder is an opinionated implementation of the base builder class or interface.

> I acknowledge the opportunity for confusion with the word "concrete" here with the physical material concrete (also used to build houses). In this context, "concrete" is describing a builder implementation.

### Director

The class that is responsible for the orchestration of the construction of products.

## Implementation

### Simple Builder

Here's a simple implementation of the builder pattern for the `House` class:

![Simple Implementation](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/simple-implementation.png?raw=true)

Using this implementation, a house object can be created like so:

![Simple Usage](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/simple-usage.png?raw=true)

Note that the same house object is being created as in the previous example, however, the optional arguments are now set via methods on the builder class, eliminating the need provide values when the defaults are desired.

### Adding Fluent Syntax (Method Chaining)

A common improvement applied to the builder pattern is enabling method chaining, also known as fluent syntax. This is accomplished by returning `this` in the methods that should be chainable. (`build()` still returns the final product).

![Method Chaining Implementation](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/method-chaining-implementation.png?raw=true)

Now `.build()` can be called immediately after a chainable method. In this case, `withSwimmingPool()`:

![Method Chaining Usage](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/method-chaining-usage.png?raw=true)

### Adding Concrete Builders

The above implementation is a good start, but it's not adding much value. The builder pattern really shines with concrete builders. To recap, a concrete builder is just a builder with some of the details filled in for a specific variation of the product.

At this point, it's important to create an interface for all of the concrete builders to implement. This will ensure that all concrete builders work the same way and produce a variation of the same product. Make sure to remove the `HouseBuilder` class from the previous example to avoid conflicts.

![Concrete Builder Interface](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/concrete-builder-interface.png?raw=true)

Two concrete builder classes implementing `HouseBuilder` are being created below: `StandardHouseBuilder` and `LargeHouseBuilder`.

-   A standard house will always have 3 bedrooms, 2 bathrooms, and 1500 square feet.
-   A large house will always have 5 bedrooms, 4 bathrooms, and 3500 square feet.

Just as before, neither will have a garage or swimming pool by default, however, the `withGarage()` and `withSwimmingPool()` methods will add those options without requiring any arguments.

![Concrete Builder Classes](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/concrete-builder-classes.png?raw=true)

Now the concrete buliders can create a house object without any constructor or method arguments:

![Concrete Builder Usage](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/concrete-builder-usage.png?raw=true)

### Adding a Director

The final piece is the director class. This special class further abstracts the creation of product variations.

In the concrete builders above, default values are being set that are specific to the type of house being built. These include the number of bedrooms, bathrooms, and square feet. Note that the type of house is not dictating whether or not it includes a garage or a swimming pool. Think of them as floor plans.

The director class below takes things a step further by providing methods for building houses with or without garages and/or swimming pools. For simplicity, two variations are being considered: **basic** and **luxury**.

-   A basic house has no upgrades, i.e., no garage or swimming pool.
-   A luxury house has both a swimming pool and a garage.

![Director Implementation](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/director-implementation.png?raw=true)

With the director class in place, variations of the the house product can be created without having to dig into the details of the house class's constructor:

![Director Usage](https://github.com/dapperdandev/blog/blob/main/posts/design-patterns/builder-pattern/director-usage.png?raw=true)

## Real-World Example

Building a house for a blog post is a bit contrived. A more realistic scenario for web developers is building a SQL query for a database. In fact, many ORM libraries come with a query builder out of the box. Check out this example from [TypeORM](https://typeorm.io/select-query-builder#what-is-querybuilder):

## Considerations

While the builder pattern is a convenient way to create complex objects, it isn't a one-size-fits all solution. The house example in this article is a great candidate for options object pattern. Similar scenarios may be better suited for the factory pattern. Ultimately, it's up to the developer to research their various solutions and choose the pattern that best fits their needs.

## Conclusion

The builder pattern is fairly simple to implement at a basic level. Adding concrete builders and a director can simplify object creation even further, though often at the cost of clarity by abstracting away too many details. Regardless, the builder pattern is commonly used in various libraries and makes for a great addition to any developer's toolbox.
