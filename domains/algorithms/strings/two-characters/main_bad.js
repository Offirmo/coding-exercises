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


function max_len(arr, letters, count, max_letters) {
    let s = arr.join('')
    //console.log(`\n--\n${letters.length} - max_len`, { s, arr, letters, count, max_letters })

    // quickly weed out repeating letters
    let repeating_letters = letters.filter(l => s.indexOf(l + l) >= 0)
    //console.log('repeating_letters', repeating_letters)
    // repeating letters can't be kept or we fail
    if (repeating_letters.length > letters.length - max_letters)
        return 0 // impossible
    if (repeating_letters.length === 0 && letters.length === max_letters) {
        //console.log('Found a candidate !', s, 'length', s.length)
        return s.length // this is a possibility
    }

    if (repeating_letters.length) {
        // remove "mandatory" = "non keepable" letters
        //console.log('letters_to_remove', repeating_letters)
        arr = _.pull(arr.slice(0), ...repeating_letters)
        //console.log('new array', arr)
        s = arr.join('')
        //console.log('new s', s)
        letters = _.difference(letters, repeating_letters)
        //console.log('new letters', letters)
        //console.log('new letter count', letters.length)

        // recurse with current state
        return max_len(
            arr,
            letters,
            count,
            max_letters
        )
    }
    else {
        // recurse by removing one letter at a time
        return letters.reduce((acc, l) => {
            return Math.max(acc, max_len(
                _.pull(arr.slice(0), l),
                _.pull(letters.slice(0), l),
                count,
                max_letters
            ))
        }, 0)
    }
}


function maxLen(n, s){
    let arr = s.trim().split('')
    const letters = _.uniq(arr)

    // let's count the letters
    const count = _.countBy(arr)

    return max_len(arr, letters, count, 2)
}

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var result = maxLen(n, s);
    process.stdout.write(""+result+"\n");
}
