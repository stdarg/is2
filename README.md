is2
===
is2 is a type-checking module for node.js to test values. Is does not throw exceptions. Use is2 to validate types in your node.js code. Every function in is2 returns either true of false.

After finding Enrico Marino's module is, the concise syntax amazed, but there were syntax issues that made using is difficult. This fork of is fixes though issues, but the module is no longer cross-platform. Also, added tests via mocha which can be run using 'npm test'.

## Installation
To install is2, type:

    $ npm install is2

## Usage

    var is = require('is2');

    console.log('true is equal to 1===1: '+(is.equal(true, 1===1));
    console.log('10 is a positive number: '+(is.positiveNumber(10));
    console.log('11 is an odd number: '+(is.oddNumber(11));

## API

  - [exports.type()](#exportstypevaluevaluetypestring)
  - [exports.defined()](#exportsdefinedvalueany)
  - [exports.nullOrUndef()](#exportsnullorundefvaluevalue)
  - [exports.empty()](#exportsemptyvalueany)
  - [exports.equal()](#exportsequalvaluevaluevalueother)
  - [exports.hosted()](#exportshostedvaluestringhosthost)
  - [exports.instanceOf()](#exportsinstanceofvaluevalue)
  - [exports.null()](#exportsnulltovalue)
  - [exports.undefined()](#exportsundefinedvaluevalue)
  - [exports.arguments()](#exportsargumentsvaluevalue)
  - [exports.array()](#exportsarrayvaluevalue)
  - [exports.nonEmptyArray()](#exportsnonemptyarrayvaluevalue)
  - [exports.array.empty()](#exportsarrayemptyvaluearrayarguments)
  - [exports.arrayLike()](#exportsarraylikevaluevalue)
  - [exports.boolean()](#exportsbooleanvaluevalue)
  - [exports.false()](#exportsfalsevaluevalue)
  - [exports.true()](#exportstruevalueboolean)
  - [exports.date()](#exportsdatevaluevalue)
  - [exports.error()](#exportserrorvaluevalue)
  - [exports.function()](#exportsfunctionvaluevalue)
  - [exports.number()](#exportsnumbertovalue)
  - [exports.positiveNumber()](#exportspositivenumbertovalue)
  - [exports.negativeNumber()](#exportsnegativenumbertovalue)
  - [exports.decimal()](#exportsdecimalvaluevalue)
  - [exports.divisibleBy()](#exportsdivisiblebyvaluenumbernnumber)
  - [exports.int()](#exportsinttovalue)
  - [exports.positiveInt()](#exportspositiveinttovalue)
  - [exports.negativeInt()](#exportsnegativeinttovalue)
  - [exports.maximum()](#exportsmaximumvaluenumberothersarray)
  - [exports.minimum()](#exportsminimumvaluenumberothersarray)
  - [exports.nan()](#exportsnantovalue)
  - [exports.even()](#exportsevenvaluenumber)
  - [exports.odd()](#exportsoddvaluenumber)
  - [exports.ge()](#exportsgevaluenumberothernumber)
  - [exports.gt()](#exportsgtvaluenumberothernumber)
  - [exports.le()](#exportslevaluenumberothernumber)
  - [exports.lt()](#exportsltvaluenumberothernumber)
  - [exports.within()](#exportswithinvaluenumberstartnumberfinishnumber)
  - [exports.object()](#exportsobjectvalueany)
  - [exports.nonEmptyObject()](#exportsnonemptyobjecttovalue)
  - [exports.objectInstanceof()](#exportsobjectinstanceofobjinstobjectobjtypeobject)
  - [exports.regexp()](#exportsregexptovalue)
  - [exports.string()](#exportsstringtovalue)
  - [exports.nonEmptyString()](#exportsnonemptystringtovalue)

### exports.type(value:value, type:String)

  Test if 'value' is a type of 'type'.
  Alias: a

### exports.defined(value:Any)

  Test if 'value' is defined.
  Alias: def

### exports.nullOrUndef(value:value)

  Test is 'value' is either null or undefined.
  Alias: nullOrUndef

### exports.empty(value:Any)

  Test if 'value' is empty. To be empty means to be an array, object or string with nothing contained.

### exports.equal(value.:value, value:other)

  Test if 'value' is equal to 'other'. Works for objects and arrays and will do deep comparisions,
  using recursion.
  Alias: eq

### exports.hosted(value:String, host:host)

  Test if 'key' in host is an object. To be hosted means host[value] is an object.

### exports.instanceOf(value:value)

  Test if 'value' is an instance of 'constructor'.
  Aliases: instOf, instanceof

### exports.null(to:value)

  Test if 'value' is null.

### exports.undefined(value:value)

  Test if 'value' is undefined.
  Aliases: undef, udef

### exports.arguments(value:value)

  Test if 'value' is an arguments object.
  Alias: args

### exports.array(value:value)

  Test if 'value' is an array.
  Alias: ary, arry

### exports.nonEmptyArray(value:value)

  Test if 'value' is an array containing at least 1 entry.
  Aliases: nonEmptyArry, nonEmptyAry

### exports.array.empty(value:Array|Arguments)

  Test if 'value' is an empty array(like) object.
  Aliases: arguents.empty, args.empty, ary.empty, arry.empty

### exports.arrayLike(value:value)

  Test if 'value' is an arraylike object (i.e. it has a length property with a valid value)
  Aliases: arraylike, arryLike, aryLike

### exports.boolean(value:value)

  Test if 'value' is a boolean.
  Alias: bool

### exports.false(value:value)

  Test if 'value' is false.

### exports.true(value:Boolean)

  Test if 'value' is true.

### exports.date(value:value)

  Test if 'value' is a date.

### exports.error(value:value)

  Test if 'value' is an error object.
  Alias: err

### exports.function(value:value)

  Test if 'value' is a function.
  Alias: func

### exports.number(to:value)

  Test if 'value' is a number.
  Alias: num

### exports.positiveNumber(to:value)

  Test if 'value' is a positive number.
  Alias: positiveNum, posNum

### exports.negativeNumber(to:value)

  Test if 'value' is a negative number.
  Aliases: negNum, negativeNum

### exports.decimal(value:value)

  Test if 'value' is a decimal number.
  Aliases: decimalNumber, decNum

### exports.divisibleBy(value:Number, n:Number)

  Test if 'value' is divisible by 'n'.
  Alias: divisBy

### exports.int(to:value)

  Test if 'value' is an integer.
  Alias: integer

### exports.positiveInt(to:value)

  Test if 'value' is a positive integer.
  Alias: posInt

### exports.negativeInt(to:value)

  Test if 'value' is a negative integer.
  Aliases: negInt, negativeInteger

### exports.maximum(value:Number, others:Array)

  Test if 'value' is greater than 'others' values.
  Alias: max

### exports.minimum(value:Number, others:Array)

  Test if 'value' is less than 'others' values.
  Alias: min

### exports.nan(to:value)

  Test if 'value' is not a number.
  Alias: notANumber, notANum

### exports.even(value:Number)

  Test if 'value' is an even number.

### exports.odd(value:Number)

  Test if 'value' is an odd number.

### exports.ge(value:Number, other:Number)

  Test if 'value' is greater than or equal to 'other'.
  Aliases: greaterOrEq, greaterOrEqual

### exports.gt(value:Number, other:Number)

  Test if 'value' is greater than 'other'.
  Aliases: greaterThan

### exports.le(value:Number, other:Number)

  Test if 'value' is less than or equal to 'other'.
  Alias: lessThanOrEq, lessThanOrEqual

### exports.lt(value:Number, other:Number)

  Test if 'value' is less than 'other'.
  Alias: lessThan

### exports.within(value:Number, start:Number, finish:Number)

  Test if 'value' is within 'start' and 'finish'.
  Alias: withIn

### exports.object(value:Any)

  Test if 'value' is an object. Note: Arrays, RegExps, Date, Error, etc all return false.
  Alias: obj

### exports.nonEmptyObject(to:value)

  Test if 'value' is an object with properties. Note: Arrays are objects.
  Alias: nonEmptyObj

### exports.objectInstanceof(objInst:object, objType:object)

  Test if 'value' is an instance type objType.
  Aliases: objInstOf, objectinstanceof

### exports.regexp(to:value)

  Test if 'value' is a regular expression.
  Alias: regexp

### exports.string(to:value)

  Test if 'value' is a string.
  Alias: str

### exports.nonEmptyString(to:value)

  Test if 'value' is a non-empty string.
  Alias: nonEmptyStr
