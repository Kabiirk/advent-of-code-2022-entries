const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function parse(input_string){
    var filled = new Set();

    for(const line of input_string){
        const coords = [];

        for(const str_coord of line.split(' -> ')){
            const [x, y] = str_coord.split(',').map(Number)
            coords.push([x, y])
        }

        for (let i = 1; i < coords.length; i++) {
            const [cx, cy] = coords[i];
            // Previous coords
            const [px, py] = coords[i-1];

            if(cy !== py){
                for (let y = Math.min(cy, py); y <= Math.max(cy, py); y++) {
                    filled.add(`${cx},${y}`);
                }
            }
            if(cx !== px){
                for (let x = Math.min(cx, px); x <= Math.max(cx, px); x++) {
                    filled.add(`${x},${cy}`);
                }
            }
        }
    }

    return filled
}

// for Part 1
const simulate_sand = (filled, max_y) => {
    // Sand Fall Origin
    let [x, y] = [500, 0]

    while(y<=max_y){
        // drop straight down
        if(!filled.has(`${x},${y+1}`)){
            y++;
            continue;
        }
        // drop to left
        if(!filled.has(`${x-1},${y+1}`)){
            x--;
            y++;
            continue;
        }
        // drop to right
        if(!filled.has(`${x+1},${y+1}`)){
            x++
            y++;
            continue;
        }

        // Standstill
        filled.add(`${x},${y}`);
        return true;
    }

    // Fallen into Abyss
    return false;
}

// for Part 2
const simulate_sand_with_floor = (filled_2, max_y2) => {
    // Sand Fall Origin
    let [x, y] = [500, 0]

    if( filled_2.has(`${x},${y}`) ){
        return [x, y];
    }
    
    while(y<=max_y2){
        // drop straight down
        if(!filled_2.has(`${x},${y+1}`)){
            y++;
            continue;
        }
        // drop to left
        if(!filled_2.has(`${x-1},${y+1}`)){
            x--;
            y++;
            continue;
        }
        // drop to right
        if(!filled_2.has(`${x+1},${y+1}`)){
            x++
            y++;
            continue;
        }

        // Standstill
        break;
    }

    // Reached till source
    return [x, y];
}


// Part 1
var filled = parse(input);
// Last wall
const max_y = Math.max(...[...filled].map(coord => Number(coord.split(',')[1])))
let sand_before_abyss = 0;

while(true){
    const res = simulate_sand(filled, max_y);

    if(!res){
        break;
    }

    sand_before_abyss++;
}
console.log(sand_before_abyss);// 828

// Part 2
const filled_2 = parse(input);
let sand_till_source_filled = 0;

while(true){
    const [x, y] = simulate_sand_with_floor(filled_2, max_y);
    filled_2.add(`${x},${y}`)
    sand_till_source_filled++;
    if(x===500 && y===0){
        break;
    }
}
console.log(sand_till_source_filled);// 25500
