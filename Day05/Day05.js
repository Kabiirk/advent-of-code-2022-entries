const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');


let stack_input = input[0].split('\n');
let moves_input = input[1].split('\n');


// Functions To parse data into usable Arrays
function create_stack(stack_input){
    let stacks = [];
    pattern = /\d+/g;
    
    // 9
    let max_stacks = Math.max(...stack_input[stack_input.length-1].match(/\d+/g).map(num => +num));

    for(let loop = 0; loop < max_stacks; loop++) {
        stacks.push([]);
    }

    for(let loop = stack_input.length-2; loop>=0; loop--){
        let stack_number = 0;
        let str_loop = 0;
        while(str_loop < stack_input[loop].length){
            const substr = stack_input[loop].substring(str_loop, str_loop+3);
            if(substr !== ""){
                stacks[stack_number].push(substr.charAt(1))
            }
            stack_number++;
            str_loop += 4;
        }
    }

    for(let i = 0; i<stacks.length; i++){
        while(stacks[i][stacks[i].length-1] === " "){
            stacks[i].pop();
        }
    }

    return stacks;
}

function create_moves(moves_input){
    let moves = [];
    /*
    For statement below :
    statement = move 3 from 9 to 7
    
    returns
    result = [3, 9, 7]
    i.e.
    result[0] = crates to move
    result[1] = from which stack
    result[2] = to which stack
    */
    for(let i = 0; i<moves_input.length; i++){
        // console.log(moves_input[i].match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number))
        moves.push(moves_input[i].match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number));
    }

    return moves;
}

let stacks = create_stack(stack_input);
const moves = create_moves(moves_input);

function top_crates(stacks, moves, part){
    for(let m=0; m<moves.length; m++){
        let num_crates = moves[m][0];
        let from_stack = moves[m][1];
        let to_stack = moves[m][2];

        let moved_crates = stacks[from_stack-1].splice(stacks[from_stack-1].length-num_crates, num_crates);
        if(part===1){
            stacks[to_stack-1] = stacks[to_stack-1].concat(moved_crates.reverse())
        }
        else if(part===2){
            stacks[to_stack-1] = stacks[to_stack-1].concat(moved_crates)
        }
    }

    print_stack(stacks, only_top=true);
}

function print_stack(stacks, only_top=false){
    var result = "";
    for(let i=0; i<stacks.length; i++){
        if(!only_top){
            result+= "[ "+stacks[i].join(", ")+" ]\n";
        }
        else{
            // console.log(i+1, stacks[i][stacks[i].length-1]);
            result+=stacks[i][stacks[i].length-1].toString();
        }
    }
    console.log(result);
}

// Part 1
top_crates(stacks, moves, 1); // PTWLTDSJV

// Part 2
let stacks2 = create_stack(stack_input); // Because JS is mutating Stacks array after Solving Part1
top_crates(stacks2, moves, 2); // WZMFVGGZP