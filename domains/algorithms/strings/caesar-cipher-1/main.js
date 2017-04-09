#!/usr/bin/env node
"use strict";

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

const _ = require('lodash')

const [_a, _z, _A, _Z] = 'azAZ'.split('').map(c => c.charCodeAt(0))

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var k = parseInt(readLine());

    const u8arr = Uint8Array.from(s, (c, i) => s.charCodeAt(i))
    const out = u8arr.map(c => {
        if (c < _A) return c
        if (c > _z) return c
        if (c <= _Z) {
            return (c - _A + k) % 26 + _A
        }
        if (c >= _a) {
            return (c - _a + k) % 26 + _a
        }
        return c
    })
    console.log(String.fromCharCode(...out))
}
