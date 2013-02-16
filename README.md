is2
===
is2 is a type-checking module for node.js to test values. Is does not throw exceptions. Use is2 to validate types in your node.js code. Every function in is2 returns either true of false.

After finding Enrico Marino's module is, the concise syntax amazed, but there were syntax issues that made using is difficult. This fork of is fixes though issues, but the module is no longer cross-platform.

## Installation
To install is2, type:

<code>
$ npm install is2
</code>

## Usage

    var is = require('is2');
    
    console.log('true is equal to 1===1: '+(is.equal(true, 1===1));
    console.log('10 is a positive number: '+(is.positiveNumber(10));
    console.log('11 is an odd number: '+(is.oddNumber(11));

