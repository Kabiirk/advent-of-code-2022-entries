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

function compress_graph(raw_graph, rates){
    var g = raw_graph;
    for(const valve in raw_graph){
        g[valve].dists = {}
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
    // console.log(g);

    for(var valve in g){
        // delete g[valve]
        if(valve !== "AA" && rates[valve]===0){
            delete g[valve];
        }
    }

    return g;
}

// Part 1
function dfs(compressed_graph, start_valve, remaining_time, opened_valves, cache = {}){
    const cache_key = `${start_valve}-${remaining_time}-${opened_valves.join(",")}`;

    if(cache_key in cache){ return cache[cache_key]; }
    const to_release = opened_valves.map(v => rates[v]).reduce((acc, r)=> acc + r, 0);
    const max = Math.max(
        to_release*remaining_time,
        ...Object.entries(compressed_graph[start_valve].dists)
        .filter(([neighbor, dist]) => remaining_time - dist - 1 > 0)
        .filter(([neighbor, dist]) => !opened_valves.includes(neighbor))
        .map(
            ([neighbor, dist]) => 
            (dist + 1)*to_release + dfs(compressed_graph, neighbor, remaining_time-dist-1, [...opened_valves, neighbor], cache)
        )
    )
    cache[cache_key] = max
    return max
}

// Part 2
function dfs_2_agents(compressed_graph, start_valve, remaining_time, opened_valves, openable_valves, cache = {}){
    const cache_key = `${start_valve}-${remaining_time}-${opened_valves.join(",")}`;

    if(cache_key in cache){ return cache[cache_key]; }
    const to_release = opened_valves.map( v => rates[v] ).reduce( (acc, r) => acc+r,0 );
    const max = Math.max(
        to_release*remaining_time,

        ...Object.entries(compress_graph[start_valve].dists)
        .filter( ([neighbor, dist]) => remaining_time - dist - 1 > 0 )
        .filter( ([neighbor, dist]) => !opened_valves.includes(neighbor) && openable_valves.has(neighbor) )
        .map( ([neigh]) )
    )

    return 0;
}

// Part 1
[graph, rates, distance] = parse_input(input);
var compressed_graph = compress_graph(graph, rates);
var res = dfs(compressed_graph, 'AA', 30, []);
console.log(res);// 1789

// Part 2

