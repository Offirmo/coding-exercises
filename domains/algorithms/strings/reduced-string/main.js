#!/usr/bin/env node
"use strict";


const _ = require('lodash')

function processData(input) {
    let s = input.trim()

    const u8in = Uint8Array.from(s, (c, i) => s.charCodeAt(i))
    const u8temp = u8in.slice(0)

    let l = u8in.length
    let i = 0
    while(i < l - 1) {
        if (u8temp[i] === u8temp[i + 1]) {
            u8temp.copyWithin(i, i + 2)
            i = Math.max(i - 1, 0)
            l -= 2
        }
        else
            i++
    }
    const u8out = u8temp.slice(0, l)

    console.log(
        l > 0
            ? String.fromCharCode(...u8out)
            : 'Empty String'
    )
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
