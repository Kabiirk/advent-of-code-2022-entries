const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

// Parse Input in required format
for(var i = 0; i<input.length; i++){
    input[i] = input[i].split(" ");
    input[i][1] = Number(input[i][1])
}

const move_def = {
    R:{ x:1, y:0 },
    L:{ x:-1, y:0 },
    U:{ x:0, y:1 },
    D:{ x:0, y:-1 },
};

class Point{
    constructor(x, y){
        this.x = 0;
        this.y = 0;
    }


    move(direction){
        const delta = move_def[direction];
        this.x += delta.x;
        this.y += delta.y;
    }

    follow(point){
        const distance = Math.max(
                                    Math.abs(this.x - point.x),
                                    Math.abs(this.y - point.y)
                                );
        if(distance > 1){
            // Move Point
            const direction_x = point.x - this.x;
            /*
            0 -> do nothing
            1 or 2 -> this.x++ or this.y++;
            -1 or -2 -> this.x-- or this.y--;
            */
            this.x += Math.abs(direction_x) === 2 ? direction_x/2 : direction_x;
            const direction_y = point.y - this.y;
            this.y += Math.abs(direction_y) === 2 ? direction_y/2 : direction_y;
        }
    }
}

function mark_visited(x, y, visited_set){
    visited_set.add(`${x}-${y}`);
}

function move_rope(move_set){
    let tail = new Point(0,0);
    let head = new Point(0,0);
    const visited = new Set();
    mark_visited(0, 0, visited);

    for (var line of move_set) {
        var direction = line[0];
        var total_moves = line[1];
        for(let i = 0; i<total_moves; i++){
            head.move(direction);
            // console.log(head);
            tail.follow(head);
            mark_visited(tail.x, tail.y, visited);
        }
    }

    console.log(visited.size)

}

/*
Longer rope has more knots which follow the same behaviour
between 2 knots as part 1.
We need to treat the rope of 10 knots as 9 smaller ropes of
2 knots each joined together acting as 1 big rope.
*/
function move_longer_rope(move_set){
    const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
    const visited = new Set();
    mark_visited(0, 0, visited);

    for (var line of move_set) {
        var direction = line[0];
        var total_moves = line[1];
        for(let i = 0; i<total_moves; i++){
            // move head as per directions
            knots[0].move(direction);
            // move rest of the rope
            for (let knot = 1; knot < knots.length; knot++) {
                const point = knots[knot];
                point.follow(knots[knot-1])
            }
            const tail = knots[knots.length - 1];
            mark_visited(tail.x, tail.y, visited);
        }
    }

    console.log(visited.size)
}

// Part 1
move_rope(input);// 6503

// Part 2
move_longer_rope(input);// 2724
