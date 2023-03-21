const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

// console.log(input);

const graph = {};
const rates = {};

for(var line of input){
    // Valve AW has flow rate=0; tunnels lead to valves LG, TL
    try {
        var a = line.split("; tunnels lead to valves ");
        console.log(a[1].split(", "));
    } catch (TypeError) {
        var a = line.split("; tunnel leads to valve ");
        console.log(a[1].split(", "));
    }
    
    // var pattern = /Valve (?<valve>-?\w+) has flow rate=(?<flow>-?\d+); tunnels lead to valves/;
    // var pattern_matches = line.match(pattern).groups;
    // console.log(valve, flow);
}