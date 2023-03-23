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
var i = 1;
for(var line of input){
    // Valve AW has flow rate=0; tunnels lead to valves LG, TL
    var edges = []
    try {
        var a = line.split("; tunnels lead to valves ");
        // console.log(i, a[1].split(", "));
        edges = a[1].split(", ");
    } catch (TypeError) {
        var a = line.split("; tunnel leads to valve ");
        // console.log(i, a[1].split(", "));
        edges = a[1].split(", ");
    }
    // console.log(edges);
    i++;
    var pattern = /Valve (?<valve>-?\w+) has flow rate=(?<flow>-?\d+)/;
    var pattern_matches = a[0].match(pattern).groups;
    // console.log(pattern_matches.valve, Number(pattern_matches.flow));
    graph[pattern_matches.valve] = edges;
    rates[pattern_matches.valve] = Number(pattern_matches.flow);
    // console.log(a[0]);
}

console.log(graph);
console.log(rates);