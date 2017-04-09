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

function solve(grades){
    return grades.map(grade => {
        if (grade < 38) return grade
        const next_multiple_of_5 = Math.ceil(grade/5) * 5
        return (next_multiple_of_5 - grade) < 3 ? next_multiple_of_5 : grade
    }).join('\n')
}

function main() {
    var n = parseInt(readLine());
    var grades = [];
    for(var grades_i = 0; grades_i < n; grades_i++){
    	grades[grades_i] = parseInt(readLine());
    }
    var result = solve(grades);
    process.stdout.write(""+result+"\n");

}
