/*
 *  @Soldy\typeHardeningrc\2021.02.18\GPL3
 */
'use strict';
/*
 * @prototype
 */
const TypeHardeningBase = function(){
    /*
     * @param {object} options
     * @param {any} value
     * @public
     * @return {boolean} false if failed true if correct
     */
    this.check = function(options, value){
        if(typeof options.type === 'undefined')
            return false;
        if(typeof value === 'undefined')
            return false;
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
    const _link_types = [
        '[]',
        'bool',
        'func',
        '=>()',
        '()',
        'int'
    ];
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
        '()'       : 'function',
        'integer'  : 'integer',
        'int'      : 'integer',
        'list'     : 'list',
        'select'   : 'select',
        'string'   : 'string'
    };
    const _translator = function(type){
        if (typeof _dictonary[type] === 'undefined' )
             return false;
        return _dictonary[type];
    }
    const _realTypeExist = function(type){
        if (_real_types.indexOf(type) > -1 )
            return true;
        return false;
    }
    const _linkTypeExist = function(type){
        if (_link_types.indexOf(type) > -1 )
            return true;
        return false;
    }
    const _typeExist  = function(type){
        if(_realTypeExist(type))
             return true;
        if(_linkTypeExist(type))
             return true;
        return false;
    }
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _numberLimit = function(obj){
        if(
            (typeof obj.max === 'number')&&
            (obj.value > obj.max)
        )
            return false;
        if(
            (typeof obj.min === 'number')&&
            (obj.min > obj.value)
        )
            return false;
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
        )
            return false;
        if(
            (typeof obj.min === 'number')&&
            (obj.min > obj.value.length)
        )
            return false;
        return true;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _anyCheck = function(obj){
        return true;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const _booleanCheck = function(obj){
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
        if(typeof options.list !== 'undefined')
            obj.list = options.list;
        if(typeof options.max !== 'undefined')
            obj.max = options.max;
        if(typeof options.min !== 'undefined')
            obj.min = options.min;
        if(_typeExist(options.type) === false)
            return false;
        options.type = _translator(options.type);
        return _checkList[options.type](obj);
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
exports.base = TypeHardeningBase;
exports.Base = TypeHardeningBase;
