#!/usr/bin/env node
"use strict";

const _ = require('lodash')

process.stdin.resume();
process.stdin.setEncoding('ascii');

var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function (data) {
    __input_stdin += data;
});



////////////////


/*
 * Complete the function below.
 */
function validate(input) {
    let res = ''

    let error = false
    let field_count = 0
    let empty_value_count = 0
    let last_field = ''

    // first let's properly unescape
    const SEP = '↔'
    const EOL = '\n'
    input = input.replace(/\|/g, SEP)

    let unescaped_input = ''
    for(let i = 0; i < input.length; ++i) {
        if (input[i] === '~') {
            if (i === input.length-1) {
                console.error('unterminated escape sequence at the end')
                error = true
                break
            }
            if (input[i+1] === SEP) {
                unescaped_input += '|'
                i++
                continue
            }
            if (input[i+1] === '~') {
                unescaped_input += '~'
                i++
                continue
            }
            if (input[i+1] === 'n') {
                unescaped_input += EOL
                i++
                continue
            }
            //console.error('incorrect escape sequence at', i)
            error = true
            break
        }
        unescaped_input += input[i]
    }

    //console.log({unescaped_input})

    const [ names, ...records ] = unescaped_input.trim().split(EOL).map(raw => _.initial(_.tail(raw.split(SEP))))
    //console.log({names, records})
    const record_count = records.length
    last_field = _.last(names)
    let max_index = names.length

    records.forEach(r => {
        empty_value_count += r.length - _.compact(r).length
        max_index = Math.max(max_index, r.length)
    })
    if (max_index > names.length)
        last_field = `${last_field}_${max_index - names.length}`

    res = `${record_count}:${field_count}:${empty_value_count}:${error ? 'format_error' : last_field}`
    return res
}
console.log(validate('|name|address|~n|Patrick|patrick@test.com|pat@test.com|~n|Annie||annie@test.com|~n')) // 2:3:1:address_1
console.log(validate('|name|add~~ress|~n|Pat~|rick|patrick@test.com|pat@test.com|~n|Annie||annie@test.com|~n'))
//console.log(validate'|name|address|~n|Patrick|patrick@test.com|pat@test.com|~n|Annie|annie@test.com|~n|Zoe|~n')) // 3:3:3:address_1
//console.log(validate(8))
//console.log(validate(7792875))
process.exit(1)

/////////////////



var fs = require('fs');
//var wstream = fs.createWriteStream(process.env.OUTPUT_PATH);
process.stdin.on('end', function () {
    __input_stdin_array = __input_stdin.split("\n");
    var res;
    var _instructions = __input_stdin_array[__input_currentline].trim();
    __input_currentline += 1;

    res = validate(_instructions);
    console.log(res+"\n");

    //wstream.end();
});

