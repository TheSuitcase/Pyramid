/*
  Quickly check if a variable is 
  a certain type.

  The value MUST at least match one type!
  otherwise it will return false

  Input: value, typeA, typeB, ....
  Output: true / false

 */
let index = {
  string: '[object String]',
  array: '[object Array]',
  object: '[object Object]',
  regexp: '[object RegExp]',
  boolean: '[object Boolean]',
  function: '[object Function]',
}

let typeIndex = {
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Object]': 'object',
  '[object RegExp]': 'regexp',
  '[object Boolean]': 'boolean',
  '[object Function]': 'function',
}

let TypeOf = (value, ...args) => {
  if (args.length === 0) {
    return typeIndex[Object.prototype.toString.apply(value)] || undefined
  }

  let i = 0, len = args.length
  let type

  let matches = 0

  for (i; i < len; i++) {
    type = args[i]

    switch (type) {
      case 'undefined':
        if (value === undefined) {
          matches++
        }
        break
      case 'string':
      case 'number':
      case 'boolean':
      case 'function':
        if (typeof value === type) {
          matches++
        }
        break

      case 'regexp':
      case 'object':
      case 'array':
        if (!index[type]) {
          continue
        }
        if (Object.prototype.toString.apply(value) === index[type]) {
          matches++
        }
        break
    }
  }

  if (matches > 0) {
    return true
  }

  return false
}

export default TypeOf
