#!/usr/bin/env node
"use strict";

function processData(input) {
    const [l1, ...pairs] = input.trim().split('\n');
    const [ astronaut_count ] = l1.split(' ').map(Number)

    let country_count = 0
    let astronauts_by_country = {} // XXX country indexes will start at 1 for easier !!falsy comparison
    let country_by_astronaut = {}

    pairs.forEach(raw_pair => {
        const [a1, a2] = raw_pair.split(' ').map(Number)
        let country_1 = country_by_astronaut[a1]
        let country_2 = country_by_astronaut[a2]
        let country_index = country_1 || country_2 || ++country_count
        const country_astronaut_list = (astronauts_by_country[country_index] || (new Set()))
        country_astronaut_list.add(a1)
        country_astronaut_list.add(a2)

        if (country_2 && country_2 != country_index) {
            // we thought we had 2 different countries,
            // but they are one -> merge them
            astronauts_by_country[country_2].forEach(a => {
                country_astronaut_list.add(a)
                country_by_astronaut[a] = country_1
            })
            // we'll now have an empty country but who cares ?
            astronauts_by_country[country_2] = new Set()
        }
        astronauts_by_country[country_index] = country_astronaut_list
        country_by_astronaut[a1] = country_by_astronaut[a2] = country_index
    })

    // now let's add countries for loners
    for(let a = 0; a < astronaut_count; ++a) {
        if (country_by_astronaut[a]) continue
        let country_index = ++country_count
        const country_astronaut_list = new Set()
        country_astronaut_list.add(a)
        astronauts_by_country[country_index] = country_astronaut_list
        country_by_astronaut[a] = country_index
    }

    let possible_combinations_count = 0
    let matched_astronauts = 0
    // XXX rembember countries indexes are 1..count
    for(let c1 = 1; c1 < country_count; ++c1) {
        const c1_astro_count = astronauts_by_country[c1].size
        matched_astronauts += c1_astro_count
        possible_combinations_count += c1_astro_count * (astronaut_count - matched_astronauts)
    }
    console.log(possible_combinations_count)
}
/*processData(`
10 7
0 2
1 8
1 4
2 8
2 6
3 5
6 9
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
