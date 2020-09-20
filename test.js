const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});

const typeHardening =  new (require('./index.js')).typeHardeningBase();

nanoTest.add(
    'check missing type',
    {
        'function':typeHardening.check,
        'options' :[
            {
            },
            44
        ]
    },
    '===',
    false
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
                'type':'notype'
            },
            'energy'
        ]
    },
    '===',
    false
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
                'max' : 33
            },
            44
        ]
    },
    '===',
    false
);

nanoTest.add(
    'check correct integer with limit to small',
    {
        'function':typeHardening.check,
        'options' :[
            {
                'type':'integer',
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
    'check toosmall string with limit',
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
                'type':'array'
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




nanoTest.run();

