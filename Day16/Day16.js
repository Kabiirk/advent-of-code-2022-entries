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
    const distance = {};
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
        distance[pattern_matches.valve] = 0;
        // console.log(a[0]);
    }

    return [graph, rates, distance];
}

[graph, rates, distance] = parse_input(test);
console.log(graph);
// console.log(rates);
/*
dist = {
    AA : {DD: 1, II:2, BBL3};
    ...
}
*/

function compress_graph(graph, rates){
    var g = graph;
    for(const valve in g){
        g[valve].dist = {}
        if(valve !== "AA" && rates[valve]===0){ continue; }
        const visited = new Set();
        const q = [[0, valve]];

        // bfs
        while(q.length > 0){
            const [dist, v] = q.shift();
            if(visited.has(v)){ continue; }
            visited.add(v);
            if(rates[v]>0){
                g[valve].dists[v] = dist;
            }
            // g[v].edges.forEach(neighbor => {
            //     console.log(neighbor);
            //     // q.push([dist+1, neighbor]);
            // });
            for(var neighbor of g[v]){
                q.push([dist+1, neighbor]);
            }
        }
        delete g[valve].dists[valve];
    }

    for(var valve in g){
        delete g[valve]
        if(valve !== "AA" && rates[valve]===0){
            delete g[valve];
        }
    }

    console.log(g);
    // return g;
}

compress_graph(graph, rates);

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