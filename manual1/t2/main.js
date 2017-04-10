#!/usr/bin/env node
"use strict";

const _ = require('lodash')

/*
process.stdin.resume();
process.stdin.setEncoding('ascii');

var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function (data) {
    __input_stdin += data;
});
*/


////////////////////


/*
 * Complete the function below.
 */
function next(s) {
    let res = ''
    let buffer = s[0]
    let count = 1
    for(let i = 1; i < s.length; ++i) {
        if (s[i] !== buffer) {
            res += `${count}${buffer}`
            count = 0
        }
        buffer = s[i]
        count++
    }
    res += `${count}${buffer}`

    return res
}
function LookAndSay(start, n) {
    for(let i = 0; i < n; ++i) {
        start = next(start)
    }
    return start
}
console.log(LookAndSay('11', 2))
process.exit()






/////////////////////

var fs = require('fs');
//var wstream = fs.createWriteStream(process.env.OUTPUT_PATH);
process.stdin.on('end', function () {
    __input_stdin_array = __input_stdin.split("\n");
    var res;
    var _start = __input_stdin_array[__input_currentline].trim();
    __input_currentline += 1;

    var _n = parseInt(__input_stdin_array[__input_currentline].trim(), 10);
    __input_currentline += 1;

    res = LookAndSay(_start, _n);
    console.log(res+"\n");

});
