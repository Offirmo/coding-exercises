#!/usr/bin/env node
"use strict";

function processData(input) {
    //Enter your code here
    const [ raw_target, raw_n, raw_numbers ] = input.split('\n')
    const numbers = raw_numbers.split(' ')
    console.log(numbers.indexOf(raw_target))
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
