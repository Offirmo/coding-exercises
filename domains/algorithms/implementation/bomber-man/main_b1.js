#!/usr/bin/env node
"use strict";

require('@offirmo/cli-toolbox/stdout/clear-cli')()
const prettifyJson = require('@offirmo/cli-toolbox/string/prettify-json')
//const assert = require('assert')

let logger = {
    log: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
}
logger = console

function memoize1(f) {
    const cache = {}
    return function cached(a) {
        const key = '' + a
        if (!cache.hasOwnProperty(key))
            cache[key] = f(a)
        else
            console.log('cache hit')
        return cache[key]
    }
}


function factory(R, C) {
    const ascii_map_full_of_bombs = Array(R+1).join(Array(C+1).join("O") + '\n')
    const joinable_array_full_of_bombs = ascii_map_full_of_bombs.split('')
    const max_i = joinable_array_full_of_bombs.length - 1

    logger.log({ R, C, max_i })

    function get_destroyed_cells_when_explosion_at(i) {
        let res = [
            i,
            i - 1,
            i + 1,
            i - C - 1,
            i + C + 1
        ]

        return res.filter(i => i >= 0 && ((i+1) % (C+1) !== 0) && i <= max_i)
    }

    function next(raw_map) {
        let joinable_array = raw_map.split('')
        const res = joinable_array_full_of_bombs.slice(0)
        joinable_array.forEach((val, i) => {
            if (val !== 'O') return
            // detonate
            let destroyed_cells = get_destroyed_cells_when_explosion_at(i)
            destroyed_cells.forEach(ix => res[ix] = '.')
        })

        return res.join('')
    }

    return {
        ascii_map_full_of_bombs,
        next: memoize1(next)
    }
}


// bomb states:
// .012
function processData(input) {
    logger.log(input)

    const [ raw_params, ...raw_map_lines ] = input.split('\n')
    const raw_map = raw_map_lines.join('\n')

    const [ R, C, N ] = raw_params.split(' ').map(Number)

    let res = ''
    if (N === 1) {
        // no time to do anything
        res = raw_map
    }
    else {
        const resolver = factory(R, C)
        if (N % 2 === 0) {
            // trivial: full of bombs
            res = resolver.ascii_map_full_of_bombs
        }
        else {
            // not implemented
            logger.log(`T+1`)
            logger.log(res)
            for(let i = 2; i <= N; i++) {
                if (i % 2 === 0) {
                    logger.log(`T+${i}`)
                    logger.log(resolver.ascii_map_full_of_bombs)
                }
                else {
                    res = resolver.next(res)
                    logger.log(`T+${i}`)
                    logger.log(res)
                }
            }

            logger.log(`final, step ${N}`)
            logger.log(res)
        }
    }
    console.log(res)
}
/*
processData(`3 3 3
...
.O.
...`)
process.exit(1)*/

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
