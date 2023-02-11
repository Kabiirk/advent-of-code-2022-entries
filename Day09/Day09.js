const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

// Test start
var test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.trim().split('\n');

for(var j = 0; j<test.length; j++){
    test[j] = test[j].split(" ");
    test[j][1] = Number(test[j][1])
}

// Test end

for(var i = 0; i<input.length; i++){
    input[i] = input[i].split(" ");
    input[i][1] = Number(input[i][1])
}

function process_motion(motion, x, y){
    // yield [x, y];
    var direction = motion[0];
    var length = motion[1];
    switch (direction) {
        case "L":
            for(let i = 0; i<length; ++i){
                --x;
            }
            return [x, y];
            break;
        case "R":
            for(let i = 0; i<length; ++i){
                ++x;
            }
            return [x, y];
            break;
        case "U":
            for(let i = 0; i<length; ++i){
                ++y;
            }
            return [x, y];
            break;
        case "D":
            for(let i = 0; i<length; ++i){
                --y;
            }
            return [x, y];
            break;
        default:
            break;
    }
}

function move_tail(tx, ty, hx, hy){
    if(tx<hx-2 || tx>hx+2 || ty<hy-2 || ty>hy+2){
        throw new Error("Head far away !")
    }
    if( !( hx-1<=tx && hx+1>=tx && hy-1<=ty && hy+1>=ty ) ){
        tx += hx > tx ? 1 : hx < tx ? -1 : 0;
        ty += hy > ty ? 1 : hy < ty ? -1 : 0;
    }
    return [tx, ty];
}

var tail_path = new Set();
function process_tail_motion(motions, tail_path_set){
    let hx = 0;
    let hy = 0;
    let tx = 0;
    let ty = 0;
    // yield [tx, ty];

    for(let k = 0; k<motions.length; k++){
        var head = process_motion(motions[k], hx, hy);
        hx = head[0];
        hy = head[1];
        var tail = move_tail(tx, ty, hx, hy);
        tx = tail[0];
        ty = tail[1];
        tail_path_set.add( tx.toString()+","+ty.toString() );
        // yield [tx, ty];
    }
}

process_tail_motion(test, tail_path);
console.log(tail_path);

// console.log(test)