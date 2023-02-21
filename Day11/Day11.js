const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

for(var i=0; i<input.length; i++){
    var monkey_object = {};
    monkey = input[i].split("\n").map( x => x.trim() );

    // Parse input
    pattern = /\d+/g;
    monkey_object["id"] = Number( monkey[0].match(pattern)[0] );
    monkey_object["starting_item"] = monkey[1].match(pattern).map( x => Number(x) );
    monkey_object["operation"] = {};
    monkey_object["operation"]["op_sign"] = monkey[2].split(" ").reverse()[1];
    monkey_object["operation"]["value"] = Number( monkey[2].match(pattern) );
    monkey_object["div_test"] = {};
    monkey_object["div_test"]["by"] = Number( monkey[3].match(pattern) );
    monkey_object["div_test"]["true"] = Number( monkey[4].match(pattern) );
    monkey_object["div_test"]["false"] = Number( monkey[5].match(pattern) );

    input[i] = monkey_object;
}

console.log(input);

var s = 0;