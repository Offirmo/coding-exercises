#!/usr/bin/env node
"use strict";

const _ = require('lodash')

process.stdin.resume();
process.stdin.setEncoding('ascii');

var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function (data) {
    __input_stdin += data;
});



////////////////

/*
 * Complete the function below.
 */
function compute(n) {
    let res = ''
    let digits = '0atlsin'
    let BASE = 7

    do {
        let digit = n % BASE
        res = digits[digit] + res
        n = Math.trunc((n - digit) / BASE)
    } while(n > 0)

    return res
}
console.log(compute(0))
console.log(compute(7))
console.log(compute(8))
console.log(compute(7792875))

/////////////////



var fs = require('fs');
//var wstream = fs.createWriteStream(process.env.OUTPUT_PATH);
process.stdin.on('end', function () {
    __input_stdin_array = __input_stdin.split("\n");
    var res;
    var _instructions = __input_stdin_array[__input_currentline].trim();
    __input_currentline += 1;

    res = compute(_instructions);
    console.log(res+"\n");

    //wstream.end();
});

