const nanoTest  = new (require('nanoTest')).test({
    'debug_print' : 'short',
    'progress_bar' : false
});

let typeHardeningrc =  (require('./index.js')).base;
let typeHardening ;
console.log('2 expected error messages is the correct result.');

(async function(){
    nanoTest.add(
        'init',
        {
            'function' : function(){
                typeHardening = new typeHardeningrc();
            }
        },
        '!error'
    );
    await nanoTest.partly();
    nanoTest.add(
        'check missing type',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'do_error':true
                },
                44
            ]
        },
        'error'
    );
    nanoTest.add(
        'check any no error',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'any',
                    'do_error':true
                },
                null
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check any',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'any'
                },
                null
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check missing value no error',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'no_error':true,
                    'type':'integer'
                }
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check missing value',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'integer'
                }
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check not exist type',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'notype',
                    'do_error':true
                },
                'energy'
            ]
        },
        'error'
    );
    nanoTest.add(
        'check correct boolean true',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'boolean'
                },
                true
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check correct boolean false',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'boolean'
                },
                false
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check incorrect boolean',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'boolean'
                },
                44
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct bool true',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'bool'
                },
                true
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check correct bool false',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'bool'
                },
                false
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check incorrect bool',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'bool'
                },
                44
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct integer',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'integer'
                },
                44
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check correct integer with limit',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'integer',
                    'min' : 20,
                    'max' : 50
                },
                44
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check correct integer with limit to big',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'integer',
                    'min' : 20,
                    'max' : 33,
                    'no_error':true
                },
                44
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check incorrect integer',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'integer'
                },
                44.44
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct int',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'int'
                },
                44
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check correct int with limit',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'int',
                    'min' : 20,
                    'max' : 50
                },
                44
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check correct int with limit to big',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'int',
                    'min' : 20,
                    'max' : 33
                },
                44
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check correct int with limit to small',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'int',
                    'min' : 46,
                    'max' : 50
                },
                44
            ]
        },
        '===',
        false
    );


    nanoTest.add(
        'check incorrect int',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'int'
                },
                44.44
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct float',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'float'
                },
                44.44
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check incorrect float',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'float'
                },
                'not floeat :P' 
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct string',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'string'
                },
                'just a string'
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check correct string with limit',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type': 'string',
                    'min' : 2,
                    'max' : 100
                },
                'just a string'
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check tosmall string with limit',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type': 'string',
                    'min' : 99,
                    'max' : 100
                },
                'just a string'
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check toobig string with limit',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type': 'string',
                    'min' : 2,
                    'max' : 5
                },
                'just a string'
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check incorrect string',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'string'
                },
                ['not','string']
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct array',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'array'
                },
                ['just','an','array']
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check incorrect array',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'arrayy',
                    'do_error':true
                },
                'not an array'
            ]
        },
        'error'
    );
    nanoTest.add(
        'check correct []',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'[]'
                },
                ['just','an','array']
            ]
        },
        '===',
        true
    );
    nanoTest.add(
        'check incorrect []',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'[]'
                },
                'not an array'
            ]
        },
        '===',
        false
    );
    nanoTest.add(
        'check correct select',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'select',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                'shop'
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check missing list select',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'select'
                },
                'shop'
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check not array list select',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'select',
                    'list':56
                },
                'shop'
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check incorrect select',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'select',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                'shopka'
            ]
        },
        '===',
        false
    );


    nanoTest.add(
        'check correct list single element',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                'shop'
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check list with missing list',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list'
                },
                'shop'
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check list with not arrray list',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list',
                    'list':23
                },
                'shop'
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'check correct list multi elements',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                ['shop', 'time']
            ]
        },
        '===',
        true
    );

    nanoTest.add(
        'check incorrect list single element',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                'shopka'
            ]
        },
        '===',
        false 
    );

    nanoTest.add(
        'check incorrect list multi element',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'list',
                    'list':[
                        'one',
                        'shop',
                        'little',
                        'bin',
                        'some',
                        'time',
                        'llvm',
                        'just',
                        'not',
                        'work'
                    ]
                },
                ['intel','amd']
            ]
        },
        '===',
        false 
    );

    nanoTest.add(
        'check correct function ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'function'
                },
                function(){ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check correct arrow function ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'function'
                },
                ()=>{ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check incorrect function ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'function'
                },
                'not a function'
            ]
        },
        '===',
        false 
    );



    nanoTest.add(
        'check correct func',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'func'
                },
                function(){ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check correct arrow func ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'func'
                },
                ()=>{ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check incorrect func ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'func'
                },
                'not a function'
            ]
        },
        '===',
        false 
    );



    nanoTest.add(
        'check correct =>() ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'=>()'
                },
                function(){ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check correct arrow =>() ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'=>()'
                },
                ()=>{ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check incorrect =>() ',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'=>()'
                },
                'not a function'
            ]
        },
        '===',
        false 
    );



    nanoTest.add(
        'check correct ()',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'()'
                },
                function(){ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check correct arrow ()',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'()'
                },
                ()=>{ return false; }
            ]
        },
        '===',
        true
    );


    nanoTest.add(
        'check incorrect ()',
        {
            'function':typeHardening.check,
            'options' :[
                {
                    'type':'()'
                },
                'not a function'
            ]
        },
        '===',
        false 
    );

    nanoTest.add(
        'default any',
        {
            'function':typeHardening.getDefault,
            'options' :[
                {
                    'type':'any'
                }
            ]
        },
        '===',
        ''
    );


    nanoTest.add(
        'default boolean',
        {
            'function':typeHardening.getDefault,
            'options' :[
                {
                    'type':'boolean'
                }
            ]
        },
        '===',
        false
    );

    nanoTest.add(
        'default float',
        {
            'function':typeHardening.getDefault,
            'options' :[
                {
                    'type':'float'
                }
            ]
        },
        '===',
        0.00
    );

    nanoTest.add(
        'default integer',
        {
            'function':typeHardening.getDefault,
            'options' :[
                {
                    'type':'int'
                }
            ]
        },
        '===',
        0
    );

    nanoTest.add(
        'default string',
        {
            'function':typeHardening.getDefault,
            'options' :[
                {
                    'type':'string'
                }
            ]
        },
        '===',
        ''
    );

    nanoTest.run();
})();
