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
    var a = [];
    for(var a_i = 0; a_i < n; a_i++){
    	a[a_i] = readLine().split(' ');
    	a[a_i] = a[a_i].map(Number);
    }

    let diag1sum = 0
    let diag2sum = 0

    for(let i = 0; i<n; i++) {
        diag1sum += a[i][i]
        diag2sum += a[i][n-i-1]
    }

    console.log(
        Math.abs(diag1sum - diag2sum)
    )
}
