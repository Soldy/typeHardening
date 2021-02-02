# typeHardening

Type hardening is a simple type / type limit checker


## init 


```javascript

const typeHardening =  new (require('./index.js')).base();

```

## check 

```javacript

typeHardening.check(
    {  // variable type description
       'type':'string', // variable type
       'list': [], // list of posible values (optional)
       'max': [], // maximum value limit (optional)
       'min': [] // minimum value limit (optional)
    },
    'variable' // the variable 
);


// expectation is true

```



