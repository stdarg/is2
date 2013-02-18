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

  - [is.type()](#exportstypevaluevaluetypestring)
  - [is.defined()](#exportsdefinedvalueany)
  - [is.nullOrUndef()](#exportsnullorundefvaluevalue)
  - [is.empty()](#exportsemptyvalueany)
  - [is.equal()](#exportsequalvaluevaluevalueother)
  - [is.hosted()](#exportshostedvaluestringhosthost)
  - [is.instanceOf()](#exportsinstanceofvaluevalue)
  - [is.null()](#exportsnulltovalue)
  - [is.undefined()](#exportsundefinedvaluevalue)
  - [is.arguments()](#exportsargumentsvaluevalue)
  - [is.array()](#exportsarrayvaluevalue)
  - [is.nonEmptyArray()](#exportsnonemptyarrayvaluevalue)
  - [is.array.empty()](#exportsarrayemptyvaluearrayarguments)
  - [is.arrayLike()](#exportsarraylikevaluevalue)
  - [is.boolean()](#exportsbooleanvaluevalue)
  - [is.false()](#exportsfalsevaluevalue)
  - [is.true()](#exportstruevalueboolean)
  - [is.date()](#exportsdatevaluevalue)
  - [is.error()](#exportserrorvaluevalue)
  - [is.function()](#exportsfunctionvaluevalue)
  - [is.number()](#exportsnumbertovalue)
  - [is.positiveNumber()](#exportspositivenumbertovalue)
  - [is.negativeNumber()](#exportsnegativenumbertovalue)
  - [is.decimal()](#exportsdecimalvaluevalue)
  - [is.divisibleBy()](#exportsdivisiblebyvaluenumbernnumber)
  - [is.int()](#exportsinttovalue)
  - [is.positiveInt()](#exportspositiveinttovalue)
  - [is.negativeInt()](#exportsnegativeinttovalue)
  - [is.maximum()](#exportsmaximumvaluenumberothersarray)
  - [is.minimum()](#exportsminimumvaluenumberothersarray)
  - [is.nan()](#exportsnantovalue)
  - [is.even()](#exportsevenvaluenumber)
  - [is.odd()](#exportsoddvaluenumber)
  - [is.ge()](#exportsgevaluenumberothernumber)
  - [is.gt()](#exportsgtvaluenumberothernumber)
  - [is.le()](#exportslevaluenumberothernumber)
  - [is.lt()](#exportsltvaluenumberothernumber)
  - [is.within()](#exportswithinvaluenumberstartnumberfinishnumber)
  - [is.object()](#exportsobjectvalueany)
  - [is.nonEmptyObject()](#exportsnonemptyobjecttovalue)
  - [is.objectInstanceof()](#exportsobjectinstanceofobjinstobjectobjtypeobject)
  - [is.regexp()](#exportsregexptovalue)
  - [is.string()](#exportsstringtovalue)
  - [is.nonEmptyString()](#exportsnonemptystringtovalue)

### is.type(value:value, type:String)

  Test if 'value' is a type of 'type'.
  Alias: a

### is.defined(value:Any)

  Test if 'value' is defined.
  Alias: def

### is.nullOrUndef(value:value)

  Test is 'value' is either null or undefined.
  Alias: nullOrUndef

### is.empty(value:Any)

  Test if 'value' is empty. To be empty means to be an array, object or string with nothing contained.

### is.equal(value.:value, value:other)

  Test if 'value' is equal to 'other'. Works for objects and arrays and will do deep comparisions,
  using recursion.
  Alias: eq

### is.hosted(value:String, host:host)

  Test if 'key' in host is an object. To be hosted means host[value] is an object.

### is.instanceOf(value:value)

  Test if 'value' is an instance of 'constructor'.
  Aliases: instOf, instanceof

### is.null(to:value)

  Test if 'value' is null.

### is.undefined(value:value)

  Test if 'value' is undefined.
  Aliases: undef, udef

### is.arguments(value:value)

  Test if 'value' is an arguments object.
  Alias: args

### is.array(value:value)

  Test if 'value' is an array.
  Alias: ary, arry

### is.nonEmptyArray(value:value)

  Test if 'value' is an array containing at least 1 entry.
  Aliases: nonEmptyArry, nonEmptyAry

### is.array.empty(value:Array|Arguments)

  Test if 'value' is an empty array(like) object.
  Aliases: arguents.empty, args.empty, ary.empty, arry.empty

### is.arrayLike(value:value)

  Test if 'value' is an arraylike object (i.e. it has a length property with a valid value)
  Aliases: arraylike, arryLike, aryLike

### is.boolean(value:value)

  Test if 'value' is a boolean.
  Alias: bool

### is.false(value:value)

  Test if 'value' is false.

### is.true(value:Boolean)

  Test if 'value' is true.

### is.date(value:value)

  Test if 'value' is a date.

### is.error(value:value)

  Test if 'value' is an error object.
  Alias: err

### is.function(value:value)

  Test if 'value' is a function.
  Alias: func

### is.number(to:value)

  Test if 'value' is a number.
  Alias: num

### is.positiveNumber(to:value)

  Test if 'value' is a positive number.
  Alias: positiveNum, posNum

### is.negativeNumber(to:value)

  Test if 'value' is a negative number.
  Aliases: negNum, negativeNum

### is.decimal(value:value)

  Test if 'value' is a decimal number.
  Aliases: decimalNumber, decNum

### is.divisibleBy(value:Number, n:Number)

  Test if 'value' is divisible by 'n'.
  Alias: divisBy

### is.int(to:value)

  Test if 'value' is an integer.
  Alias: integer

### is.positiveInt(to:value)

  Test if 'value' is a positive integer.
  Alias: posInt

### is.negativeInt(to:value)

  Test if 'value' is a negative integer.
  Aliases: negInt, negativeInteger

### is.maximum(value:Number, others:Array)

  Test if 'value' is greater than 'others' values.
  Alias: max

### is.minimum(value:Number, others:Array)

  Test if 'value' is less than 'others' values.
  Alias: min

### is.nan(to:value)

  Test if 'value' is not a number.
  Alias: notANumber, notANum

### is.even(value:Number)

  Test if 'value' is an even number.

### is.odd(value:Number)

  Test if 'value' is an odd number.

### is.ge(value:Number, other:Number)

  Test if 'value' is greater than or equal to 'other'.
  Aliases: greaterOrEq, greaterOrEqual

### is.gt(value:Number, other:Number)

  Test if 'value' is greater than 'other'.
  Aliases: greaterThan

### is.le(value:Number, other:Number)

  Test if 'value' is less than or equal to 'other'.
  Alias: lessThanOrEq, lessThanOrEqual

### is.lt(value:Number, other:Number)

  Test if 'value' is less than 'other'.
  Alias: lessThan

### is.within(value:Number, start:Number, finish:Number)

  Test if 'value' is within 'start' and 'finish'.
  Alias: withIn

### is.object(value:Any)

  Test if 'value' is an object. Note: Arrays, RegExps, Date, Error, etc all return false.
  Alias: obj

### is.nonEmptyObject(to:value)

  Test if 'value' is an object with properties. Note: Arrays are objects.
  Alias: nonEmptyObj

### is.objectInstanceof(objInst:object, objType:object)

  Test if 'value' is an instance type objType.
  Aliases: objInstOf, objectinstanceof

### is.regexp(to:value)

  Test if 'value' is a regular expression.
  Alias: regexp

### is.string(to:value)

  Test if 'value' is a string.
  Alias: str

### is.nonEmptyString(to:value)

  Test if 'value' is a non-empty string.
  Alias: nonEmptyStr
