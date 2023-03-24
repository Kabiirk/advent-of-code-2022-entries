const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

// console.log(input);
var test = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`
test = test.split("\n");

function parse_input(text_input){
    const graph = {};
    const rates = {};
    // var i = 1;
    for(var line of text_input){
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
        // i++;
        var pattern = /Valve (?<valve>-?\w+) has flow rate=(?<flow>-?\d+)/;
        var pattern_matches = a[0].match(pattern).groups;
        // console.log(pattern_matches.valve, Number(pattern_matches.flow));
        graph[pattern_matches.valve] = edges;
        rates[pattern_matches.valve] = Number(pattern_matches.flow);
        // console.log(a[0]);
    }

    return [graph, rates];
}

[graph, rates] = parse_input(test);
console.log(graph);
console.log(rates);


// function bfs(graph, rates){
//     const time = 30;
    
//     // BFS
//     const queue = [];
    
//     var root = "AA";
//     var flow = 0;
//     var open_valves = [];

//     queue.push(root);

//     while(queue.length > 0){
//         const current = queue.shift();
//         if(rates[current]>0 && !graph[current]){
//             queue.push(
//                 {

//                 }
//             )
//         }
//     }
// }