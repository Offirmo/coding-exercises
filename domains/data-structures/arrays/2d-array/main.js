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
    let arr = [];
    for(let arr_i = 0; arr_i < 6; arr_i++){
    	arr[arr_i] = readLine().split(' ');
    	arr[arr_i] = arr[arr_i].map(Number);
    }

    function get_sum_of_hourglass_at(arr, x, y) {
       return arr[y][x] + arr[y][x+1] + arr [y][x+2] +
                          arr[y+1][x+1] +
              arr[y+2][x] + arr[y+2][x+1] + arr [y+2][x+2]
    }

    let max_sum = -100000000000
    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 4; y++) {
            const sum = get_sum_of_hourglass_at(arr, x, y)
            max_sum = Math.max(max_sum, sum)
        }
    }
    console.log(max_sum)
}
