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
    var n = parseInt(readLine());
    let arr = readLine().split(' ');
    arr = arr.map(Number);

    let np = 0, nn = 0, nz = 0
    arr.forEach(v => {
        if (v === 0)
            nz++
        else if (v > 0)
            np++
        else
            nn++
    })
    console.log((np / arr.length).toPrecision(6))
    console.log((nn / arr.length).toPrecision(6))
    console.log((nz / arr.length).toPrecision(6))
}
