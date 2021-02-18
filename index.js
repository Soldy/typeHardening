'use strict';


const typeHardeningBase = function(){
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
        let obj = {};
        obj.value = value;
        if(typeof options.list !== 'undefined')
            obj.list = options.list;
        if(typeof options.max !== 'undefined')
            obj.max = options.max;
        if(typeof options.min !== 'undefined')
            obj.min = options.min;
        if(typeof list[options.type] === 'undefined')
            return false;
        return list[options.type](obj);
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const numberLimit = function(obj){
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
    const stringLimit = function(obj){
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
    const anyCheck = function(obj){
        return true;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const booleanCheck = function(obj){
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
    const integerCheck = function(obj){
        if (parseInt(obj.value) === obj.value)
            return numberLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const floatCheck = function(obj){
        if (parseFloat(obj.value) === obj.value)
            return numberLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const stringCheck = function(obj){
        if (obj.value.toString() === obj.value)
            return stringLimit(obj);
        return false;
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const arrayCheck = function(obj){
        return Array.isArray(obj.value);
    };
    /*
     * @param {object} obj
     * @private
     * @return {boolean}
     */
    const selectCheck = function(obj){
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
    const listCheck = function(obj){
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
    const functionCheck = function(obj){
        if(typeof obj.value === 'function')
            return true;
        return false;
    };
    /*
     * @private
     * @var {object}
     */
    const list = {
        'any'      : anyCheck,
        'array'    : arrayCheck,
        '[]'       : arrayCheck,
        'boolean'  : booleanCheck,
        'bool'     : booleanCheck,
        'float'    : floatCheck,
        'function' : functionCheck,
        'func'     : functionCheck,
        '=>()'     : functionCheck,
        '()'       : functionCheck,
        'integer'  : integerCheck,
        'int'      : integerCheck,
        'list'     : listCheck,
        'string'   : stringCheck,
        'select'   : selectCheck
    };
};

exports.base = typeHardeningBase;
