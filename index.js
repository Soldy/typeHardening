/*
 *  @Soldy\typeHardeningrc\2021.02.18\GPL3
 */
'use strict';
/*
 * @prototype
 */
const TypeHardening = function(){
    /*
     * @param {object} options
     * @param {any} value
     * @public
     * @return {boolean} false if failed true if correct
     */
    this.check = function(options, value){
        return _check(options, value);
    };
    /*
     * @param {object} options
     * @public
     * @return {any}
     */
    this.getDefault = function(options){
        if(typeof options['default'] !== 'undefined')
            return options['default'];
        return _getDefault(options);
    };
    /*
     * @private
     * @rvar {arra}
     */
    const _real_types = [
        'any',
        'array',
        'boolean',
        'float',
        'function',
        'integer',
        'list',
        'select',
        'string'
    ];
    /*
     * @private
     * @rvar {arra}
     */
    const _link_types = [
        '[]',
        'bool',
        'func',
        '=>()',
        '()=>',
        '()=>{}',
        '()',
        'int'
    ];
    /*
     * @private
     * @rvar {arra}
     */
    const _dictonary = {
        'any'      : 'any',
        'array'    : 'array',
        '[]'       : 'array',
        'boolean'  : 'boolean',
        'bool'     : 'boolean',
        'float'    : 'float',
        'function' : 'function',
        'func'     : 'function',
        '=>()'     : 'function',
        '()=>'     : 'function',
        '()=>{}'   : 'function',
        '()'       : 'function',
        'integer'  : 'integer',
        'int'      : 'integer',
        'list'     : 'list',
        'select'   : 'select',
        'string'   : 'string'
    };
    /*
     * @param {string}
     * @private
     * @return {string}
     */
    const _translator = function(type){
        return _dictonary[type];
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _realTypeExist = function(type){
        if (_real_types.indexOf(type) > -1 )
            return true;
        return false;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _linkTypeExist = function(type){
        if (_link_types.indexOf(type) > -1 )
            return true;
        return false;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _typeExist  = function(type){
        if(_realTypeExist(type))
            return true;
        if(_linkTypeExist(type))
            return true;
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _numberLimit = function(obj){
        if(
            (typeof obj.max === 'number')&&
            (obj.value > obj.max)
        ){
            if(obj.do_error !== true )
                return false;
            throw Error(
                'Error: "'+
                obj.value.toString()+
                '" is to high'
            );
        }
        if(
            (typeof obj.min === 'number')&&
            (obj.min > obj.value)
        ){
            if(obj.do_error !== true )
                return false;
            throw Error(
                'Error: "'+
                obj.value.toString()+
                '" is to low'
            );
        }
        return true;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _stringLimit = function(obj){
        if(
            (typeof obj.max === 'number')&&
            (obj.value.length > obj.max)
        ){
            if(obj.do_error !== true )
                return false;
            throw Error(
                'Error: "'+
                obj.value+
                '" is "'+
                obj.value.length.toString()+
                '" charater that to much'
            );
        }
        if(
            (typeof obj.min === 'number')&&
            (obj.min > obj.value.length)
        ){
            if(obj.do_error !== true )
                return false;
            throw Error(
                'Error: "'+
                obj.value.toString()+
                '" is "'+
                obj.value.length.toString()+
                '" charater that less than the minimum'
            );
        }
        return true;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _anyCheck = function(obj){
        if(obj.type === 'any')
            return true;
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _booleanCheck = function(obj){
        if(typeof obj.value !== 'boolean'){
            if(obj.do_error !== true )
                return false;
            throw Error(
                'Error: "'+
                obj.value.toString()+
                '" is not boolean'
            );
        }
        if (
            (obj.value === true) ||
            (obj.value === false)
        )
            return true;
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _integerCheck = function(obj){
        if (parseInt(obj.value) === obj.value)
            return _numberLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _floatCheck = function(obj){
        if (parseFloat(obj.value) === obj.value)
            return _numberLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _stringCheck = function(obj){
        if (obj.value.toString() === obj.value)
            return _stringLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _arrayCheck = function(obj){
        return Array.isArray(obj.value);
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _selectCheck = function(obj){
        if(typeof obj.list === 'undefined')
            return false;
        if(!Array.isArray(obj.list))
            return false;
        if(obj.list.indexOf(obj.value) > -1)
            return true;
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _listCheck = function(obj){
        if(typeof obj.list === 'undefined')
            return false;
        if(!Array.isArray(obj.list))
            return false;
        if(Array.isArray(obj.value)){
            for (let value of obj.value)
                if(0 > obj.list.indexOf(value))
                    return false; 
            return true;
        }else
        if(obj.list.indexOf(obj.value) > -1)
            return true;
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _functionCheck = function(obj){
        if(typeof obj.value === 'function')
            return true;
        return false;
    };
    /*
     * @private
     * @var {object}
     */
    const _checkList = {
        'any'      : _anyCheck,
        'array'    : _arrayCheck,
        'boolean'  : _booleanCheck,
        'float'    : _floatCheck,
        'function' : _functionCheck,
        'integer'  : _integerCheck,
        'list'     : _listCheck,
        'string'   : _stringCheck,
        'select'   : _selectCheck
    };
    /*
     * @param {object} options
     * @param {any} value
     * @public
     * @return {boolean} false if failed true if correct
     */
    const _check = function(options, value){
        let obj = {};
        obj.value = value;
        obj.do_error = options.do_error;
        if(typeof options.list !== 'undefined')
            obj.list = options.list;
        if(typeof options.max === 'number')
            obj.max = options.max;
        if(typeof options.min === 'number')
            obj.min = options.min;
        if(
            (typeof obj.min === 'number')&&
            (typeof obj.max === 'number')&&
            ( obj.min > obj.max )

        ){
            if(obj.do_error !== true )
                return false;
            throw Error('Incorrect Limits');
        }
        if( _typeExist(options.type) === false){
            if(obj.do_error !== true )
                return false;
            throw Error('Missing type');
        }
        obj.type = _translator(options.type);
        return _checkList[obj.type](obj);
    };
    /*
     * @param {object} obj
     * @private
     * @return {string}
     */
    const _anyDefault = function(obj){
        return '';
    };
    /*
     * @param {object} obj
     * @private
     * @return {array}
     */
    const _arrayDefault = function(obj){
        return [];
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _booleanDefault = function(obj){
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {float}
     */
    const _floatDefault = function(obj){
        if(typeof obj.min === 'undefined')
            return 0.00;
        return obj.min;
    };
    /*
     * @param {object} obj
     * @private
     * @return {function}
     */
    const _functionDefault = function(obj){
        return ()=>false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {array}
     */
    const _listDefault = function(obj){
        if ( 
            (typeof obj.list === 'undefined')||
            (typeof obj.list[0] === 'undefined')
        )
            return false;
        return [
            obj.list[0]
        ];
    };
    /*
     * @param {object} obj
     * @private
     * @return {integer}
     */
    const _integerDefault = function(obj){
        if(typeof obj.min === 'undefined')
            return 0;
        return obj.min;
    };
    /*
     * @param {object} obj
     * @private
     * @return {string}
     */
    const _stringDefault = function(obj){
        if(typeof obj.min === 'undefined')
            return '';
        return ('').padEnd(obj.min, ' ');
    };
    /*
     * @param {object} obj
     * @private
     * @return {string||array|float||boolean}
     */
    const _selectDefault = function(obj){
        if ( 
            (typeof obj.list === 'undefined')||
            (typeof obj.list[0] === 'undefined')
        )
            return false;
        return obj.list[0];
    };


    /*
     * @private
     * @var {object}
     */
    const _defaultList = {
        'any'      : _anyDefault,
        'array'    : _arrayDefault,
        'boolean'  : _booleanDefault,
        'float'    : _floatDefault,
        'function' : _functionDefault,
        'integer'  : _integerDefault,
        'list'     : _listDefault,
        'select'   : _selectDefault,
        'string'   : _stringDefault
    };
    /*
     * @param {object} options
     * @private
     * @return {any}
     */
    const _getDefault = function(options){
        if(typeof options['default'] !== 'undefined')
            return options['default'];
        if(typeof options.type === 'undefined')
            return false;
        if(_typeExist(options.type) === false)
            return false;
        options.type = _translator(options.type);
        return _defaultList[options.type](options);
    };
};
exports.base = TypeHardening;
