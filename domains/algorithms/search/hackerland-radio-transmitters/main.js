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
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    var x = readLine().split(' ');

    const sorted_house_positions = Uint32Array.from(x).sort()

    const range = k
    let house_count = sorted_house_positions.length
    let transmitter_count = 0
    let current_house_index = -1
    let furthest_covered_position = Number.NEGATIVE_INFINITY

    do {
        current_house_index++
        const current_position = sorted_house_positions[current_house_index]
        if (current_position <= furthest_covered_position) {
            // cool, I'm covered
            continue
        }

        // I'm not covered
        let furthest_house_that_can_cover_me_so_far_index = current_house_index // myself
        while (true) {
            const next_neighbour_index = furthest_house_that_can_cover_me_so_far_index + 1
            if (next_neighbour_index >= house_count) {
                // no more houses after this one
                break
            }
            const next_neighbour_position = sorted_house_positions[next_neighbour_index]
            if (next_neighbour_position - current_position > range) {
                // too far, can't cover me
                break
            }
            furthest_house_that_can_cover_me_so_far_index = next_neighbour_index
        }
        // ok, let's plant a transmitter and take into account its coverage
        //console.log('planting a transmitter on', sorted_house_positions[furthest_house_that_can_cover_me_so_far_index])
        transmitter_count++
        furthest_covered_position = sorted_house_positions[furthest_house_that_can_cover_me_so_far_index] + range
    } while(current_house_index < house_count - 1)

    console.log(transmitter_count)
}
//main()
