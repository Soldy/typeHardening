# typeHardening

Type hardening is a simple type / type limit checker


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
       'list': [], // list of posible values (optional)
       'max': [], // maximum value limit (optional)
       'min': [] // minimum value limit (optional)
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



