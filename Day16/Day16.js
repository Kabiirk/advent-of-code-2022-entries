const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function parse_input(text_input){
    const graph = {};
    const rates = {};
    const distance = {};
    for(var line of text_input){
        // Valve AW has flow rate=0; tunnels lead to valves LG, TL
        var edges = []
        try {
            var a = line.split("; tunnels lead to valves ");
            edges = a[1].split(", ");
        } catch (TypeError) {
            var a = line.split("; tunnel leads to valve ");

            edges = a[1].split(", ");
        }
        var pattern = /Valve (?<valve>-?\w+) has flow rate=(?<flow>-?\d+)/;
        var pattern_matches = a[0].match(pattern).groups;
        graph[pattern_matches.valve] = edges;
        rates[pattern_matches.valve] = Number(pattern_matches.flow);
        distance[pattern_matches.valve] = 0;

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
            for(var neighbor of g[v]){
                q.push([dist+1, neighbor]);
            }
        }
        delete g[valve].dists[valve];
    }

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
function dfs_two_agents(compressed_graph2, start_valve, remaining_time, opened_valves, openable_valves, cache = {}){
    const cache_key = `${start_valve}-${remaining_time}-${opened_valves.join(",")}`;

    if(cache_key in cache){ return cache[cache_key]; }
    const to_release = opened_valves.map( v => rates[v] ).reduce( (acc, r) => acc+r,0 );
    const max = Math.max(
        to_release*remaining_time,
        ...Object.entries(compressed_graph2[start_valve].dists)
        .filter( ([neighbor, dist]) => remaining_time - dist - 1 > 0 )
        .filter( ([neighbor, dist]) => !opened_valves.includes(neighbor) && openable_valves.has(neighbor) )
        .map( ([neighbor, dist]) => 
                (dist+1)*to_release +
                dfs_two_agents(compressed_graph2, neighbor, remaining_time-dist-1, [...opened_valves, neighbor], openable_valves, cache)
        )
    );
    cache[cache_key] = max;
    return max;
}

function range(start, end){
    var arr = Array.from(
            Array(Math.abs(end - start) + 1), 
            (_, i) => start + i
        );
    arr.pop()
    return arr;
}

function make_combos(l, k, indices_picked=[],acc=[]){
    if (indices_picked.length === k) {
      acc.push(Array.from(indices_picked).map(i => l[i]))
    } else {
      range(indices_picked.length > 0 ? indices_picked[indices_picked.length - 1] : 0, l.length)
        .filter(i => !indices_picked.includes(i))
        .forEach(i => make_combos(l, k, [...indices_picked, i], acc))
    }
    return acc
  }

function two_agents_traverse(compressed_graph, combos){
  let maxPressure = 0
  
  for (const agent1Valves of combos) {
    var arrays2 = [ Object.keys(compressed_graph).filter(valve => valve !== 'AA'), agent1Valves ]
    const agent2Valves = new Set(
        arrays2.reduce((a, b) => a.filter(c => !b.includes(c)))
    )
    maxPressure = Math.max(
      maxPressure,
      dfs_two_agents(graph, 'AA', 26, [], new Set(agent1Valves)) + dfs_two_agents(graph, 'AA', 26, [], new Set(agent2Valves))
    )
  }
  return maxPressure
}

// Part 1
[graph, rates, distance] = parse_input(input);
var compressed_graph = compress_graph(graph, rates);
var most_pressure_alone = dfs(compressed_graph, 'AA', 30, []);
console.log(most_pressure_alone);// 1789

// Part 2
var traversal_combos = make_combos(Object.keys(compressed_graph).filter( val => val !== "AA" ), 7)
var most_pressure_with_elephant = two_agents_traverse(compressed_graph, traversal_combos);
console.log(most_pressure_with_elephant);// 2496
