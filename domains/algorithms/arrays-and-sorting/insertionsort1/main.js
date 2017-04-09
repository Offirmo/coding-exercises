#!/usr/bin/env node
"use strict";

function processData(input) {
    const [ l1, l2 ] = input.trim().split('\n')
    const numbers = l2.split(' ')

    const u16in = Uint16Array.from(numbers)

    const last_index = u16in.length - 1
    const num_to_insert = u16in[last_index]
    const u16temp = u16in.slice(0)
    let inserted = false
    for(let i = last_index - 1; i >= 0 && !inserted; --i) {
        if (u16temp[i] > num_to_insert)
            u16temp[i+1] = u16temp[i]
        else {
            if (u16temp[i+1] === num_to_insert) return // nothing to do
            u16temp[i+1] = num_to_insert
            inserted = true
        }
        console.log(u16temp.toString().replace(/,/g, ' '))
    }
    if (u16temp[0] > num_to_insert) {
        u16temp[0] = num_to_insert
        console.log(u16temp.toString().replace(/,/g, ' '))
    }
}
/*
processData(`
5
2 4 6 8 3
`)
process.exit(1)*/

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});


