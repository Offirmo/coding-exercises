#!/usr/bin/env node
"use strict";

const _ = require('lodash')
const BigNumber = require('bignumber.js')

function binary_search(array, value, comp) {
    const length = array == null ? 0 : array.length
    if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
            return index;
        }
    }
    return -1
}

function baseSortedIndex(array, value, retHighest) {
    var low = 0,
        high = array == null ? low : array.length;

    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
            var mid = (low + high) >>> 1,
                computed = array[mid];

            if (computed !== null && !isSymbol(computed) &&
                (retHighest ? (computed <= value) : (computed < value))) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return high;
    }
    return baseSortedIndexBy(array, value, identity, retHighest);
}


function processData(input) {
    const [ l1, ...cases ] = input.trim().split('\n').map(v => new BigNumber(v))
    const MAX_POWER = 64
    const powers_of_two = new Array(MAX_POWER)
    powers_of_two[0] = new BigNumber(1)
    for(let i = 1; i < MAX_POWER; ++i) {
        powers_of_two[i] = powers_of_two[i - 1].times(2)
    }
    //console.log(powers_of_two)

    cases.forEach(bn_counter => {
        console.log('starting new game...', bn_counter)
        let is_current_winner_richard = true

        while (!bn_counter.equals(1)) {
            const nearest_inferior_power_of_to = powers_of_two[_.sortedIndex(powers_of_two, bn_counter) - 1]
            if (bn_counter === nearest_inferior_power_of_to)
                bn_counter = bn_counter / 2
            else
                bn_counter -= nearest_inferior_power_of_to
            is_current_winner_richard = !is_current_winner_richard
            console.log({nearest_inferior_power_of_to, bn_counter})
        }
        console.log(is_current_winner_richard ? 'Richard' : 'Louise')
    })
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

