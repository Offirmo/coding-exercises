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
function compute(instructions) {
    //console.log({instructions})

    const state = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    let holding_a_block = false
    let position = -1 // pickup

    //console.log('init', {position, holding_a_block})
    //console.log(state.map(x => x.toString(16)).join(''))

    Array.from(instructions).forEach(i => {
        //console.log(i)
        switch(i) {
            case 'P':
                holding_a_block = true
                position = 0
                break
            case 'M':
                position = Math.min(9, position + 1)
                break
            case 'L':
                if (!holding_a_block) break
                if (position >= 0 && state[position] >= 15) break
                state[position]++
                holding_a_block = false
                break
            default:
                break
        }

        //console.log('after', {position, holding_a_block})
        //console.log(state.map(x => x.toString(16).toUpperCase()).join(''))
    })

    console.log(state.map(x => x.toString(16).toUpperCase()).join(''))
}


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

