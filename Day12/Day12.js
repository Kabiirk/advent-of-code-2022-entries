const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    

function parse_input(input_graph){
    const terrain = { dem: input_graph.split("\n").map((row) => row.split("")) };
    terrain.nrows = terrain.dem.length;
    terrain.ncols = terrain.dem[0].length;
    // console.log(terrain);

    // Assign start & end
    // convert alphabets to corresponding Integers
    for(var row = 0; row < terrain.nrows; row++){
        for(var col = 0; col < terrain.ncols; col++){
            if(terrain.dem[row][col] === "S"){
                terrain.start = [row, col];
                terrain.dem[row][col] = 1;
            }
            else if(terrain.dem[row][col] === "E"){
                terrain.end = [row, col];
                terrain.dem[row][col] = 26;
            }
            else{
                terrain.dem[row][col] = terrain.dem[row][col].charCodeAt(0) - "a".charCodeAt(0) + 1;
            }
        }
    }

    return terrain;
}

const terrain = parse_input(input);
// console.log(terrain);

var test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const test_terrain = parse_input(test);
// console.log(test_terrain);

function traverse(terrain){
    const visited = new Set();
    const queue = [];

    // initialization
    queue.push([terrain.start[0], terrain.start[1], 0]);
    visited.add(`${terrain.start[0]},${terrain.start[1]}`)

    while(queue.length){
        const [r, c, d] = queue.shift();

        // immediate neighbors
        const next = [
            [r+1, c],
            [r-1, c],
            [r, c+1],
            [r, c-1]
        ]

        for(let i=0; i<next.length; i++){
            const nr = next[i][0];
            const nc = next[i][1];

            if(nr<0 || nc<0 || nr>=terrain.dem.length || nc>=terrain.dem[0].length){
                continue;
            }
            if(visited.has(`${nr},${nc}`)){
                continue;
            }
            if(terrain.dem[nr][nc] - terrain.dem[r][c] > 1){
                continue;
            }
            if(nr==terrain.end[0] && nc==terrain.end[1]){
                return d+1;
            }

            visited.add(`${nr},${nc}`);
            queue.push([nr, nc, d+1]);
        }
    }
}

// Part 1
var fewest_steps = traverse(terrain);
console.log(fewest_steps);// 472

// Part 2


var s = 0;