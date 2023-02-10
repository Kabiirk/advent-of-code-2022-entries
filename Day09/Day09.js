const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

for(var i = 0; i<input.length; i++){
    input[i] = input[i].split(" ");
    input[i][1] = Number(input[i][1])
}

console.log(input)