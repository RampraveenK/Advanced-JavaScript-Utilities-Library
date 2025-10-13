// deepClone.js

/**
 * Deep clone implementation with support for various options
 * @param {*} value - The value to clone
 * @param {Object} options - Cloning options
 * @param {boolean} options.immutable - Enable immutable mode with Proxy
 * @param {Array<Function>} options.atomicConstructors - Constructors to treat as atomic
 * @param {Function} options.transform - Transform function (value, path) => transformedValue
 * @param {Function} options.cloneFunction - Custom function cloning strategy
 * @returns {*} Cloned value
 */
function deepClone(value, options = {}) {
    let ans={},path='';
    

    for(let key in value){
      if(typeof value[key] === 'object' && value[key]!==null){
          ans[key] = cloneObject(value[key],ans,options,path+key)
      }else if(Array.isArray(value[key]) && value[key].length>0){
          ans[key] = cloneArray(value[key],ans,options,`${path}[${key}]`)
      } else{
        ans[key] = value[key]
      }
    } 
  // TODO: Implement main cloning logic
  // TODO: Initialize WeakMap for circular reference tracking
  // TODO: Handle immutable mode wrapping
  console.log(ans)
}

/**
 * Internal recursive clone implementation
 */
function cloneInternal(value, seen, options, path = []) {
  // TODO: Check for null/undefined/primitives
  // TODO: Check circular references using WeakMap
  // TODO: Handle transform hook if provided
  // TODO: Check atomicConstructors option
  // TODO: Handle built-in types (Date, RegExp, Map, Set, etc.)
  if(value instanceof RegExp) cloneRegExp(value)
  else if(value instanceof Map) cloneMap(value)
  else if(value instanceof Set) cloneSet(value)
  else if(value instanceof Date) cloneDate(value)
  // TODO: Handle typed arrays and ArrayBuffer
  // TODO: Handle functions based on options
  // TODO: Handle arrays
  // TODO: Handle plain objects and class instances
  // TODO: Preserve property descriptors
  // TODO: Preserve prototypes
}

/**
 * Clone Date objects
 */
function cloneDate(date) {
  // TODO: Implement Date cloning
  return new Date(date)
}

/**
 * Clone RegExp objects
 */
function cloneRegExp(regexp) {
  // TODO: Implement RegExp cloning with flags
  return new RegExp(regexp.source,regexp.flags)
}

/**
 * Clone Map objects
 */
function cloneMap(map, seen, options, path) {
  // TODO: Implement Map cloning (recursively clone keys and values)
  const newMap = new Map()
  seen.set(map,newMap)
  map.forEach((value,key)=>{
    if(typeof value === 'object' && value!==null){
      newMap.set(key,cloneObject(value,newMap,options,`${path}.get(${key})`))
    }else if(Array.isArray(value) && value.length>0){
      newMap.set(key,cloneArray(value,newMap,options,`${path}.get(${key})`))
    }else{
      newMap.set(key,value)
    }
  })

  return newMap
}

/**
 * Clone Set objects
 */
function cloneSet(set, seen, options, path) {
  // TODO: Implement Set cloning (recursively clone values)
  const newSet = new Set()  
  seen.set(set,newSet)
  set.forEach((value)=>{
    if(typeof value === 'object' && value!==null){
      newSet.add(cloneObject(value,newSet,options,`${path}.add(${value})`))
    }else if(Array.isArray(value) && value.length>0){
      newSet.add(cloneArray(value,newSet,options,`${path}.add(${value})`))
    }else{
      newSet.add(value)
    }
  })  

  return newSet
}

/**
 * Clone typed arrays
 */
function cloneTypedArray(typedArray) {
  // TODO: Implement typed array cloning
}

/**
 * Clone ArrayBuffer
 */
function cloneArrayBuffer(buffer) {
  // TODO: Implement ArrayBuffer cloning
}

/**
 * Clone array with property descriptors preserved
 */
function cloneArray(array, seen, options, path) {
  // TODO: Create new array
  const newArr = []
  // TODO: Mark in seen map
  seen.set(array,newArr)
  // TODO: Clone each element recursively
  array.forEach((item,index)=>{
    if(typeof item === 'object' && item!==null){
      newArr[index] = cloneObject(item,newArr,options,`${path}[${index}]`)
    } else if(Array.isArray(item) && item.length>0){
      newArr[index] = cloneArray(item,newArr,options,`${path}[${index}]`)
    } else{
      newArr[index] = item
    }
  })
  // TODO: Copy property descriptors for non-index properties
  const descriptors = Object.getOwnPropertyDescriptors(array)
  Object.keys(descriptors).forEach(key => {
      if (!Number.isInteger(Number(key))) {
            Object.defineProperty(newArr, key, descriptors[key]);
        }
      })
  return newArr
}

/**
 * Clone object with property descriptors and prototype preserved
 */
function cloneObject(obj, seen, options, path) {
  // TODO: Get prototype`
  // TODO: Create new object with same prototype
  // TODO: Mark in seen map
  // TODO: Get all property descriptors
  // TODO: Clone each property value recursively
  // TODO: Define properties with preserved descriptors
}

/**
 * Create immutable proxy wrapper with copy-on-write
 */
function createImmutableProxy(target, originalClone) {
  // TODO: Implement Proxy handler
  // TODO: Implement get trap (return nested proxies for objects)
  // TODO: Implement set trap (throw error or trigger copy-on-write)
  // TODO: Implement deleteProperty trap
  // TODO: Handle other traps as needed
  // TODO: Implement structural sharing (lazy cloning on mutation)
}

/**
 * Check if value is a plain object
 */
function isPlainObject(value) {
  // TODO: Implement plain object check
}

/**
 * Check if constructor should be treated as atomic
 */
function isAtomicConstructor(value, atomicConstructors) {
  // TODO: Check if value's constructor is in atomicConstructors list
}

// Module exports
// module.exports = deepClone;
// module.exports.deepClone = deepClone;

// ESM export
export default deepClone;
// export { deepClone };



