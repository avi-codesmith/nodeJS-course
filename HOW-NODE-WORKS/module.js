// console.log(arguments);
// there is a already injected object in all node files

/*
[Arguments] {
  '0': exports,
  '1': require,
  '2': module,
  '3': __filename,
  '4': __dirname
}
  commonJS
*/

// ❌ In ES Modules (import/export),
// there is no arguments object, and __dirname/__filename
// are not available by default.

// console.log('======================================');
// console.log(require('module').wrapper);

// importing our modules:==========================================================================================================================================

// const CALC = require('./test-module');
// const calc = new CALC();
// console.log(calc.add(1, 2)); // legacy code commonJS way of doing that

// import Calculator from './test-module.js';
// const calculator = new Calculator();
// console.log(calculator.add(1, 2)); // modern ES6 way + making object later

// import calculator from './test-module.js';
// console.log(calculator.add(1, 2)); // modern ES6 way + object already made

import { add, sub } from './short-module.js';
console.log(add(1, 2)); // importing short module one ES6
console.log(sub(2, 1)); // importing short module one ES6

// const { add, sub} = require('./short-module.js');
// console.log(add(1, 2)); // importing short commonJS legacy one

// CACHING================================================================================================================

import { logThis } from './caching.js';

logThis(); // gives data from stored module
logThis(); // gives data from stored module
logThis(); // gives data from stored module

// The ./caching.js file is executed once when it is first imported.
// Node caches the module (its exports).
// Now we can import exported module again and again.
