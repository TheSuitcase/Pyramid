> Internal

# Util

## Typeof
This is a small module within Pyramid to quickly check if a variable is a certain type.

The value MUST at least match one type or otherwise it will return false.

```js
var h = 1;

TypeOf(h, 'number') // true
```

