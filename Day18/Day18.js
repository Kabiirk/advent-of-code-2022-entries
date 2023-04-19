const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n').map(
        (x) => x.split(',').map(Number)
    );

// console.log(input)

function is_adjacent(cube_1, cube_2){
    var x_abs = Math.abs(cube_1[0]-cube_2[0])===1;
    var y_abs = Math.abs(cube_1[1]-cube_2[1])===1;
    var z_abs = Math.abs(cube_1[2]-cube_2[2])===1;

    return x_abs || y_abs || z_abs
}

console.log(is_adjacent([1,1,1], [2,1,1]));