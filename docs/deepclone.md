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
