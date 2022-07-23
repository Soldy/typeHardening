![workflow](https://github.com/Soldy/typeHardening/actions/workflows/.github/workflows/node.js.yml/badge.svg?branch=1.0.x)

# typeHardening

Type hardening is a simple type and limit checker.


## init 


```javascript

const typeHardening =  new (require('./index.js')).base();

```
## supported types


   |    type   | comment
   |-----------|-----------
   |     any   | 
   |    array  | 
   |   boolean |
   |    float  | 
   |  function | 
   |  integer  | 
   |    list   | 
   |   select  | 
   |   string  | 

## type object 

```javascript
const typeObject = {  // variable type description
       'type':'string', // variable type
       'do_error' : false, // if it's not true the check come back as false, rather than throw an error.
       'list': [], // list of possible values (optional)
       'max': 10, // maximum value limit (optional)
       'min': 0 // minimum value limit (optional)
    },

```


## check 

```javacript

typeHardening.check( 
    typeObject,
    'value' // checkable value
);

// expectation is boolean

```

## getDefault value 

```javacript

typeHardening.getDefault( typeObject );


// expectation is any

```



