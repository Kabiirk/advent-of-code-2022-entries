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

function bfs(terrain){
    const visited = new Set();
    const queue = [];

    queue.push([terrain.start[0], terrain.start[1], 0]);
    while(queue.length()){
        const [r, c, d] = queue.shift();

        // immediate neighbors
        const next = [
            [r+1, c],
            [r-1, c],
            [r, c+1],
            [r, c-1],
        ]

        for(let i=0; i<next.length; i++){
            const nr = next[i][0];
            const nc = next[i][1];

            if(nr<0 || nc<0 || nr>terrain.dem.length || nc>terrain.dem[0].length){
                continue;
            }
            if(visited.has(`${terrain.start[0]},${terrain.start[1]}`)){
                continue;
            }
            if(terrain.dem[nr][nc] - terrain.dem[r][c] > 1){
                continue;
            }
            if(nr===terrain.end[0] && nc===terrain.end[1]){
                console.log(d+1);
            }

            visited.push(`${nr},${nc}`);
            queue.push([nr, nc, d+1]);
        }
    }
}

bfs(test_terrain);

var s = 0;