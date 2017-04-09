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

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);

    const squares2x2 = Math.trunc(n / 2) * Math.trunc(m / 2)
    const lanes_2x1 = Math.trunc(n / 2) * (m % 2)
    const lanes_1x2 = Math.trunc(m / 2) * (n % 2)
    const last_square = ((m % 2) + (n % 2)) === 2 ? 1 : 0

    console.log(squares2x2 + lanes_2x1 + lanes_1x2 + last_square)
}
