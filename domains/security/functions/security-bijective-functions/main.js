#!/usr/bin/env node
"use strict";

function processData(input) {
    const [ , l2 ] = input.split('\n')
    const numbers = l2.split(' ')
    const seen = new Set()
    numbers.forEach(n => seen.add(n))
    console.log(seen.size === numbers.length ? 'YES' : 'NO')
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
