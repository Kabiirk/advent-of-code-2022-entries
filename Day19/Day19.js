const fs = require('fs');
const path = require('path');

var pattern = /Blueprint (?<blueprint_no>-?\d+): Each (?<robot_1>-?\w+) robot costs (?<robot_1_ore_cost>-?\d+) ore. Each (?<robot_2>-?\w+) robot costs (?<robot_2_ore_cost>-?\d+) ore. Each (?<robot_3>-?\w+) robot costs (?<robot_3_ore_cost>-?\d+) ore and (?<robot_3_clay_cost>-?\d+) clay. Each (?<robot_4>-?\w+) robot costs (?<robot_4_ore_cost>-?\d+) ore and (?<robot_4_obsidian_cost>-?\d+) obsidian./;
const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n').map(
        (x) => x.match(pattern).groups
    );

console.log(input);
