# deepClone.js Requirements

## Core Functionality

* Must deep clone objects and arrays.
* Must preserve prototypes of class instances.
* Must handle circular references safely.
* Must support cloning of built-in types: `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, typed arrays.

## Options & Customization

* Must allow functions to be copied by reference (default) or customized via option.
* Must provide an `atomicConstructors` option for treating certain constructors as atomic (copy by reference).
* Must support an optional `transform(value, path)` hook to customize cloning per value.

## Immutable Mode

* Must provide **immutable mode** using `Proxy`.
* Immutable mode must implement **lazy copy-on-write** (structural sharing until mutation).

## Property Handling

* Must preserve property descriptors (getters, setters, enumerability, configurability, etc.).

## Memory & Safety

* Must avoid memory leaks by using `WeakMap` for tracking references.

## Module System

* Must export as both **CommonJS** and **ESM** modules.

---

## Test Case Requirements

* Clone nested plain objects and arrays, ensuring structural equality but not identity.
* Clone objects with prototypes and class instances.
* Clone built-in types: `Date`, `RegExp`, `Map`, `Set`, typed arrays, and `ArrayBuffer`.
* Handle circular references correctly.
* Verify that functions are copied by reference (default).
* Validate `atomicConstructors` option by excluding specific instances from deep cloning.
* Validate `transform` option by customizing value cloning at specific paths.
* In immutable mode:

  * Reads should return shared structure.
  * Writes should trigger shallow clone of affected branches.
  * Original object must remain unchanged.

// testData.js - Sample data for testing deepClone

/**
 * Simple nested structures
 */
const simpleNestedObject = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Boston',
    coordinates: {
      lat: 42.3601,
      lng: -71.0589
    }
  },
  hobbies: ['reading', 'coding', 'gaming']
};

const simpleNestedArray = [
  1,
  [2, 3, [4, 5]],
  { a: 6, b: [7, 8] },
  [{ c: 9 }]
];

/**
 * Class instances with prototypes
 */
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Animal {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
  
  makeSound() {
    return 'Some sound';
  }
}

const personInstance = new Person('Alice', 25);
const animalInstance = new Animal('Dog', 'Buddy');

const objectWithPrototype = Object.create(
  { inheritedProp: 'inherited' },
  {
    ownProp: {
      value: 'own',
      enumerable: true,
      writable: true,
      configurable: true
    }
  }
);

/**
 * Circular references
 */
const circularObject = {
  name: 'circular',
  data: { value: 42 }
};
circularObject.self = circularObject;
circularObject.data.parent = circularObject;

const circularArray = [1, 2, 3];
circularArray.push(circularArray);
circularArray[1] = { arr: circularArray };

/**
 * Built-in types
 */
const builtInTypes = {
  date: new Date('2024-01-15T10:30:00Z'),
  regexp: /test-pattern/gi,
  map: new Map([
    ['key1', 'value1'],
    [{ objKey: true }, { objValue: 'nested' }],
    ['nested', new Map([['inner', 'value']])]
  ]),
  set: new Set([1, 2, 3, { a: 4 }, [5, 6]]),
  uint8Array: new Uint8Array([1, 2, 3, 4, 5]),
  int32Array: new Int32Array([-1, 0, 1, 2]),
  float64Array: new Float64Array([1.1, 2.2, 3.3]),
  arrayBuffer: new ArrayBuffer(16)
};

// Add some data to ArrayBuffer via DataView
const view = new DataView(builtInTypes.arrayBuffer);
view.setInt32(0, 42);
view.setFloat32(4, 3.14);

/**
 * Objects with functions
 */
const objectWithFunctions = {
  name: 'Calculator',
  add: function(a, b) { return a + b; },
  subtract: (a, b) => a - b,
  data: {
    multiplier: