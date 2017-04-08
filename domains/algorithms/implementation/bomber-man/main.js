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
//logger = console

function memoize1(f) {
    const cache = {}
    const res = function cached(a) {
        const key = '' + a
        if (!cache.hasOwnProperty(key))
            cache[key] = f(a)
        return cache[key]
    }
    res.__cache = cache
    return res
}

function factory(R, C) {
    const ascii_map_full_of_bombs = Array(R+1).join(Array(C+1).join("O") + '\n')
    const joinable_array_full_of_bombs = ascii_map_full_of_bombs.split('')

    const min_i = 0
    const max_i_1st_col_1st_row = C - 1
    const max_i_1st_col_last_row = (C + 1) * R - C - 1
    const max_i = (C + 1) * R - 2
    //logger.log({min_i, max_i_1st_col_1st_row, max_i_1st_col_last_row, max_i})

    const get_destroyed_cells_when_explosion_at = memoize1(function get_destroyed_cells_when_explosion_at(i) {
        if (i === min_i) return [
            i,
            i + 1,
            i + C + 1
        ]

        if (i === max_i_1st_col_1st_row) return [
            i,
            i - 1,
            i + C + 1
        ]

        if (i < C) return [
            i,
            i - 1,
            i + 1,
            i + C + 1
        ]

        if (i === max_i_1st_col_last_row) return [
            i,
            i + 1,
            i - C - 1,
        ]

        if (i > max_i_1st_col_last_row) {
            if (i < max_i) return [
                i,
                i - 1,
                i + 1,
                i - C - 1,
            ]
            return [
                i,
                i - 1,
                i - C - 1,
            ]
        }

        const x = i % (C + 1)

        if (x === 0)
            return [
                i,
                i + 1,
                i - C - 1,
                i + C + 1
            ]

        if (x === C)
            return [
                i,
                i - 1,
                i - C - 1,
                i + C + 1
            ]

        return [
            i,
            i - 1,
            i + 1,
            i - C - 1,
            i + C + 1
        ]
    })

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
            res = raw_map
            logger.log(`T+1`)
            logger.log(res)
            for(let i = 2; i <= N; i++) {
                if (i % 2 === 0) {
                    //logger.log(`T+${i}`)
                    //logger.log(resolver.ascii_map_full_of_bombs)
                }
                else {
                    res = resolver.next(res)
                    //logger.log(`T+${i}`)
                    //logger.log(res)
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
