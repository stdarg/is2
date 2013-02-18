/**
 * @fileOverview
 * is2 derived from is by Enrico Marino, adapted for Node.js.
 * License remains the same.
 * Slightly modified by Edmond Meinfelder
 *
 * is
 * the definitive JavaScript type testing library
 * Copyright(c) 2013 Edmond Meinfelder <edmond@stdarg.com>
 * Copyright(c) 2011 Enrico Marino <enrico.marino@email.com>
 * MIT license
 */
'use strict';
var owns = {}.hasOwnProperty;
var toString = {}.toString;

/**
 * @constant
 * Library version.
 * @api private
 */
exports.version = '0.1.5';

/**
 * Test if 'value' is a type of 'type'.
 * Alias: a
 * @param value value to test.
 * @param {String} type type.
 * @return {Boolean} true if 'value' is an arguments object, false otherwise.
 * @api public
 */
exports.type = function (value, type) {
    return typeof value === type;
};

/**
 * Test if 'value' is defined.
 * Alias: def
 * @param {Any} value value to test.
 * @return {Boolean} true if 'value' is defined, false otherwise.
 * @api public
 */
exports.defined = function (value) {
    return typeof value !== 'undefined';
};

/**
 * Test is 'value' is either null or undefined.
 * Alias: nullOrUndef
 * @param value value to test.
 * @return {Boolean} True if value is null or undefined, false otherwise.
 * @api public
 */
exports.nullOrUndef = function(value) {
    return value === null || typeof value === 'undefined';
};

/**
 * Test if 'value' is empty. To be empty means to be an array, object or string with nothing contained.
 * @param {Any} value value to test.
 * @return {Boolean} true if 'value' is empty, false otherwise.
 * @api public
 */
exports.empty = function (value) {
    var type = toString.call(value);

    if ('[object Array]' === type || '[object Arguments]' === type) {
        return value.length === 0;
    }

    if ('[object Object]' === type) {
        for (var key in value) if (owns.call(value, key)) return false;
        return true;
    }

    if ('[object String]' === type) {
        return value === '';
    }

    return false;
};

/**
 * Do a deep comparision of two objects for equality. Will recurse without any limits. Meant to be
 * called by equal only.
 * @param {Object} value The first object to compare.
 * @param {Object} other The second object to compare.
 * @return {Boolean} true, if the objects are equivalent, false otherwise.
 * @api private
 */
exports.objEquals = function (value, other) {
    var key;

    for (key in other) {
        // ensure all the keys that exist in obj, exist in otherObj
        if (typeof other[key] !== 'undefined' && typeof (other[key]) === 'undefined') {
            return false;
        }

        // if the types don't match, there is no equivalance
        if (typeof other[key] !== typeof (other[key])) {
            return false;
        }

        // The types match, so we need to see if we have to do a deep check
        switch (typeof (other[key])) {
        case 'object':
            if (exports.array(other[key])) {
                if (!exports.array(value[key])) {
                    return false;
                }
                if (value.length !== other.length) {
                    return false;
                }
                var len = other.length;
                while (--len) {
                    if (value[len] !== other[len]) {
                        return false;
                    }
                }
            } else {
                if (!exports.equal(other[key], value[key])) {
                    return false;
                }
            }
            break;
        case 'function':
            if (typeof (value[key]) === 'undefined' ||
              (key !== 'equals' && other[key].toString() !== value[key].toString())) {
                return false;
            }
            break;
        default:
            if (other[key] !== value[key]) {
                return false;
            }
            break;
        }
    }

    for (key in value) {
        if (typeof (other[key]) === 'undefined') {
            return false;
        }
    }

    return true;
};

/**
 * Test if 'value' is equal to 'other'. Works for objects and arrays and will do deep comparisions,
 * using recursion.
 * Alias: eq
 * @param value value.
 * @param other value to compare with.
 * @return {Boolean} true if 'value' is equal to 'other', false otherwise
 * @api public
 */
exports.equal = function (value, other) {
    var type = toString.call(value);

    if (typeof value !== typeof other) {
        return false;
    }


    if (type !== toString.call(other)) {
        return false;
    }

    if ('[object Object]' === type) {
        return exports.objEquals(value, other);
    } else if ('[object Array]' === type) {
        var index = value.length;
        if (index !== other.length) {
            return false;
        }
        while (--index > -1) {
            if (!exports.equal(value[index], other[index])) {
                return false;
            }
        }
        return true;

    } else if ('[object Function]' === type) {
        return value.prototype === other.prototype;
    } else if ('[object Date]' === type) {
        return value.getTime() === other.getTime();
    }

    return value === other;
};

/**
 * JS Type definitions which cannot host values.
 * @api private
 */
var NON_HOST_TYPES = {
      'boolean': 1
    , 'number': 1
    , 'string': 1
    , 'undefined': 1
};

/**
 * Test if 'key' in host is an object. To be hosted means host[value] is an object.
 * @param {String} value to test.
 * @param host host that may contain value.
 * @return {Boolean} true if 'value' is hosted by 'host', false otherwise.
 * @api public
 */
exports.hosted = function (value, host) {
    if (exports.nullOrUndef(value))
        return false;
    var type = typeof host[value];
    return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * Test if 'value' is an instance of 'constructor'.
 * Aliases: instOf, instanceof
 * @param value value to test.
 * @return {Boolean} true if 'value' is an instance of 'constructor'.
 * @api public
 */
exports.instanceOf = function (value, constructor) {
    if (exports.nullOrUndef(value) || exports.nullOrUndef(constructor))
        return false;
    return (value instanceof constructor);
};

/**
 * Test if 'value' is null.
 * @param value to test.
 * @return {Boolean} true if 'value' is null, false otherwise.
 * @api public
 */
exports.null = function (value) {
    return value === null;
};

/**
 * Test if 'value' is undefined.
 * Aliases: undef, udef
 * @param value value to test.
 * @return {Boolean} true if 'value' is undefined, false otherwise.
 * @api public
 */
exports.undefined = function (value) {
    return value === undefined;
};

/**
 * Test if 'value' is an arguments object.
 * Alias: args
 * @param value value to test
 * @return {Boolean} true if 'value' is an arguments object, false otherwise
 * @api public
 */
exports.arguments = function (value) {
    return '[object Arguments]' === toString.call(value);
};

/**
 * Test if 'value' is an array.
 * Alias: ary, arry
 * @param value value to test.
 * @return {Boolean} true if 'value' is an array, false otherwise.
 * @api public
 */
exports.array = function (value) {
    return '[object Array]' === toString.call(value);
};

/**
 * Test if 'value' is an array containing at least 1 entry.
 * Aliases: nonEmptyArry, nonEmptyAry
 * @param value value to test.
 * @return {Boolean} true if 'value' is an array with at least 1 value, false otherwise.
 * @api public
 */
exports.nonEmptyArray = function (value) {
    return '[object Array]' === toString.call(value) && value.length > 0;
};

/**
 * Test if 'value' is an empty array(like) object.
 * Aliases: arguents.empty, args.empty, ary.empty, arry.empty
 * @param {Array|Arguments} value value to test.
 * @return {Boolean} true if 'value' is an empty array(like), false otherwise.
 * @api public
 */
exports.array.empty = function (value) {
    return value.length === 0;
};

/**
 * Test if 'value' is an arraylike object (i.e. it has a length property with a valid value)
 * Aliases: arraylike, arryLike, aryLike
 * @param value value to test.
 * @return {Boolean} true if 'value' is an arguments object, false otherwise.
 * @api public
 */
exports.arrayLike = function (value) {
    if (exports.nullOrUndef(value))
        return false;
    return value !== undefined &&
        owns.call(value, 'length') &&
        isFinite(value.length);
};

/**
 * Test if 'value' is a boolean.
 * Alias: bool
 * @param value value to test.
 * @return {Boolean} true if 'value' is a boolean, false otherwise.
 * @api public
 */
exports.boolean = function (value) {
    return '[object Boolean]' === toString.call(value);
};

/**
 * Test if 'value' is false.
 * @param value value to test.
 * @return {Boolean} true if 'value' is false, false otherwise
 * @api public
 */
exports.false = function (value) {
    return value === false;
};

/**
 * Test if 'value' is true.
 * @param {Boolean} value to test.
 * @return {Boolean} true if 'value' is true, false otherwise.
 * @api public
 */
exports.true = function (value) {
    return value === true;
};

/**
 * Test if 'value' is a date.
 * @param value value to test.
 * @return {Boolean} true if 'value' is a date, false otherwise.
 * @api public
 */
exports.date = function (value) {
    return '[object Date]' === toString.call(value);
};

/**
 * Test if 'value' is an error object.
 * Alias: err
 * @param value value to test.
 * @return {Boolean} true if 'value' is an error object, false otherwise.
 * @api public
 */
exports.error = function (value) {
    return '[object Error]' === toString.call(value);
};

/**
 * Test if 'value' is a function.
 * Alias: func
 * @param value value to test.
 * @return {Boolean} true if 'value' is a function, false otherwise.
 * @api public
 */
exports.function = function(value) {
    return '[object Function]' === toString.call(value);
};

/**
 * Test if 'value' is a number.
 * Alias: num
 * @param value to test.
 * @return {Boolean} true if 'value' is a number, false otherwise.
 * @api public
 */
exports.number = function (value) {
    return '[object Number]' === toString.call(value);
};

/**
 * Test if 'value' is a positive number.
 * Alias: positiveNum, posNum
 * @param value to test.
 * @return {Boolean} true if 'value' is a number, false otherwise.
 * @api public
 */
exports.positiveNumber = function (value) {
    return '[object Number]' === toString.call(value) && value > 0;
};

/**
 * Test if 'value' is a negative number.
 * Aliases: negNum, negativeNum
 * @param value to test.
 * @return {Boolean} true if 'value' is a number, false otherwise.
 * @api public
 */
exports.negativeNumber = function (value) {
    return '[object Number]' === toString.call(value) && value < 0;
};

/**
 * Test if 'value' is a decimal number.
 * Aliases: decimalNumber, decNum
 * @param value value to test.
 * @return {Boolean} true if 'value' is a decimal number, false otherwise.
 * @api public
 */
exports.decimal = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 !== 0;
};

/**
 * Test if 'value' is divisible by 'n'.
 * Alias: divisBy
 * @param {Number} value value to test.
 * @param {Number} n dividend.
 * @return {Boolean} true if 'value' is divisible by 'n', false otherwise.
 * @api public
 */
exports.divisibleBy = function (value, n) {
    if (value === 0)
        return false;
    return '[object Number]' === toString.call(value) &&
        n !== 0 &&
        value % n === 0;
};

/**
 * Test if 'value' is an integer.
 * Alias: integer
 * @param value to test.
 * @return {Boolean} true if 'value' is an integer, false otherwise.
 * @api public
 */
exports.int = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 === 0;
};

/**
 * Test if 'value' is a positive integer.
 * Alias: posInt
 * @param value to test.
 * @return {Boolean} true if 'value' is a positive integer, false otherwise.
 * @api public
 */
exports.positiveInt = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 === 0 && value > 0;
};

/**
 * Test if 'value' is a negative integer.
 * Aliases: negInt, negativeInteger
 * @param value to test.
 * @return {Boolean} true if 'value' is a negative integer, false otherwise.
 * @api public
 */
exports.negativeInt = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 === 0 && value < 0;
};

/**
 * Test if 'value' is greater than 'others' values.
 * Alias: max
 * @param {Number} value value to test.
 * @param {Array} others values to compare with.
 * @return {Boolean} true if 'value' is greater than 'others' values.
 * @api public
 */
exports.maximum = function (value, others) {
    if (!exports.arrayLike(others) || !exports.number(value))
        return false;

    var len = others.length;
    while (--len > -1) {
        if (value < others[len]) {
            return false;
        }
    }

    return true;
};

/**
 * Test if 'value' is less than 'others' values.
 * Alias: min
 * @param {Number} value value to test.
 * @param {Array} others values to compare with.
 * @return {Boolean} true if 'value' is less than 'others' values.
 * @api public
 */
exports.minimum = function (value, others) {
    if (!exports.arrayLike(others) || !exports.number(value))
        return false;

    var len = others.length;
    while (--len > -1) {
        if (value > others[len]) {
            return false;
        }
    }

    return true;
};

/**
 * Test if 'value' is not a number.
 * Alias: notANumber, notANum
 * @param value to test
 * @return {Boolean} true if 'value' is not a number, false otherwise
 * @api public
 */
exports.nan = function (value) {
    return isNaN(value);
};

/**
 * Test if 'value' is an even number.
 * @param {Number} value to test.
 * @return {Boolean} true if 'value' is an even number, false otherwise.
 * @api public
 */
exports.even = function (value) {
    return '[object Number]' === toString.call(value) && value % 2 === 0;
};

/**
 * Test if 'value' is an odd number.
 * @param {Number} value to test.
 * @return {Boolean} true if 'value' is an odd number, false otherwise.
 * @api public
 */
exports.odd = function (value) {
    return !exports.decimal(value) && '[object Number]' === toString.call(value) && value % 2 !== 0;
};

/**
 * Test if 'value' is greater than or equal to 'other'.
 * Aliases: greaterOrEq, greaterOrEqual
 * @param {Number} value value to test.
 * @param {Number} other value to compare with.
 * @return {Boolean} true, if value is greater than or equal to other, false otherwise.
 * @api public
 */
exports.ge = function (value, other) {
    return value >= other;
};

/**
 * Test if 'value' is greater than 'other'.
 * Aliases: greaterThan
 * @param {Number} value value to test.
 * @param {Number} other value to compare with.
 * @return {Boolean} true, if value is greater than other, false otherwise.
 * @api public
 */
exports.gt = function (value, other) {
    return value > other;
};

/**
 * Test if 'value' is less than or equal to 'other'.
 * Alias: lessThanOrEq, lessThanOrEqual
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} true, if 'value' is less than or equal to 'other', false otherwise.
 * @api public
 */
exports.le = function (value, other) {
    return value <= other;
};

/**
 * Test if 'value' is less than 'other'.
 * Alias: lessThan
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} true, if 'value' is less than 'other', false otherwise.
 * @api public
 */
exports.lt = function (value, other) {
    return value < other;
};

/**
 * Test if 'value' is within 'start' and 'finish'.
 * Alias: withIn
 * @param {Number} value value to test.
 * @param {Number} start lower bound.
 * @param {Number} finish upper bound.
 * @return {Boolean} true if 'value' is is within 'start' and 'finish', false otherwise.
 * @api public
 */
exports.within = function (value, start, finish) {
    return value >= start && value <= finish;
};

/**
 * Test if 'value' is an object. Note: Arrays, RegExps, Date, Error, etc all return false.
 * Alias: obj
 * @param {Any} value to test.
 * @return {Boolean} true if 'value' is an object, false otherwise.
 * @api public
 */
exports.object = function (value) {
    return '[object Object]' === toString.call(value);
};

/**
 * Test if 'value' is an object with properties. Note: Arrays are objects.
 * Alias: nonEmptyObj
 * @param value to test.
 * @return {Boolean} true if 'value' is an object, false otherwise.
 * @api public
 */
exports.nonEmptyObject = function (value) {
    return '[object Object]' === toString.call(value) && Object.keys(value).length;
};

/**
 * Test if 'value' is an instance type objType.
 * Aliases: objInstOf, objectinstanceof
 * @param {object} objInst an object to testfor type.
 * @param {object} objType an object type to compare.
 * @return {Boolean} true if 'value' is an object, false otherwise.
 * @api public
 */
exports.objectInstanceof = function (objInst, objType) {
    return '[object Object]' === toString.call(objInst) && (objInst instanceof objType);
};

/**
 * Test if 'value' is a regular expression.
 * Alias: regexp
 * @param value to test.
 * @return {Boolean} true if 'value' is a regexp, false otherwise.
 * @api public
 */
exports.regexp = function (value) {
    return '[object RegExp]' === toString.call(value);
};

/**
 * Test if 'value' is a string.
 * Alias: str
 * @param value to test.
 * @return {Boolean} true if 'value' is a string, false otherwise.
 * @api public
 */
exports.string = function (value) {
    return '[object String]' === toString.call(value);
};

/**
 * Test if 'value' is a non-empty string.
 * Alias: nonEmptyStr
 * @param value to test.
 * @return {Boolean} true if 'value' is a non-empty string, false otherwise.
 * @api public
 */
exports.nonEmptyString = function (value) {
    return exports.string(value) && value.length > 0;
};

/**
 * Aliases.
 * @api private
 */
exports.a = exports.type;
exports.def = exports.defined;
exports.nullOrUndefined = exports.nullOrUndef;
exports.eq = exports.equal;
exports.instOf = exports.instanceof = exports.instanceOf;
exports.udef = exports.undef = exports.undefined;
exports.args = exports.arguments;
exports.ary = exports.arry = exports.array;
exports.nonEmptyArry = exports.nonEmptyAry = exports.nonEmptyArray;
exports.arguments.empty = exports.args.empty = exports.ary.empty = exports.arry.empty = exports.array.empty;
exports.arryLike = exports.aryLike = exports.arraylike = exports.arrayLike;
exports.bool = exports.boolean;
exports.err = exports.error;
exports.func = exports.function;
exports.num = exports.number;
exports.posNum = exports.positiveNum = exports.positiveNumber;
exports.negNum = exports.negativeNum = exports.negativeNumber;
exports.decNum = exports.decNumer = exports.decimal;
exports.divisBy = exports.divisibleBy;
exports.integer = exports.int;
exports.posInt = exports.positiveInteger = exports.positiveInt;
exports.negativeInteger = exports.negInt = exports.negativeInt;
exports.max = exports.maximum;
exports.min = exports.minimum;
exports.notANumber = exports.notANum = exports.nan;
exports.greaterThan = exports.gt;
exports.lessThanOrEq = exports.lessThanOrEqual = exports.le;
exports.lessThan = exports.lt;
exports.withIn = exports.within;
exports.obj = exports.object;
exports.nonEmptyObj = exports.nonEmptyObject;
exports.objInstOf = exports.objectInstanceOf = exports.objectInstanceof;
exports.regExp = exports.regexp;
exports.str = exports.string;
exports.nonEmptyStr = exports.nonEmptyString;
