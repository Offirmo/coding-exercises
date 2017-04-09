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

function maxLen(n, s){
    s = s.trim()
    let arr = s.split('')
    const letters = _.uniq(arr)

    // let's count the letters
    const count = _.countBy(arr)

    let max_len = 0
    letters.forEach(l1 => {
        letters.forEach(l2 => {
            if (l1 === l2) return
            const reg = `[^${l1}${l2}]*`
            const new_s = s.replace(new RegExp(reg, 'g'), '')
            //console.log(reg, `"${new_s}"`)
            if (new_s.indexOf(l1 + l1) >= 0) return
            if (new_s.indexOf(l2 + l2) >= 0) return
            max_len = Math.max(max_len, new_s.length)
        })
    })

    return max_len
}

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var result = maxLen(n, s);
    process.stdout.write(""+result+"\n");
}
