/*
--- Day 1: Calorie Counting ---
*/

// Read File
const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');


// Part 1
const sorted_calorie_sum = input
    .map((elf) => {
        return elf
            .split('\n')
            .map((item) => parseInt(item, 10))
            .reduce((sum, v) => sum + v, 0);
    })
    .sort((a, z) => z - a);

console.log(sorted_calorie_sum[0]);

// Part 2
console.log(sorted_calorie_sum[0] + sorted_calorie_sum[1] + sorted_calorie_sum[2]);
