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
                terrain.dem[row][col] = 0;
            }
            else if(terrain.dem[row][col] === "E"){
                terrain.end = [row, col];
                terrain.dem[row][col] = 26;
            }
            else{
                terrain.dem[row][col] = terrain.dem[row][col].charCodeAt(0) - "a".charCodeAt(0);
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
console.log(test_terrain);

function bfs(start, end){
    const visited = new Set();
    const queue = [];

    queue.push([terrain.start]);
}

var s = 0;