const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');


var test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`
test = test.split("\n");

// console.log(test);

function check_cycle(cycle, X, signal_strengths){
    if( (cycle===20) || ( (cycle-20)%40===0) ){
        signal_strengths.push( cycle*X );
    }
}

function add_signal_strengths(program){
    var cycle = 0;
    var X = 1;
    var signal_strengths = [];
    for(let line of program){
        var components = line.split(" ");
        var instruction = components[0];
        if(instruction==="noop"){
            cycle++;
            check_cycle(cycle, X, signal_strengths);
        }
        else{
            cycle++;
            check_cycle(cycle, X, signal_strengths);
            cycle++;
            check_cycle(cycle, X, signal_strengths);
            // var value = components[1];
            X+=Number(components[1]);
        }
    }
    return signal_strengths;
}

function update_sprite(cycle, X, sprite_pos){
    if(cycle>=1 || cycle<=40){
        sprite[0]=".";
    }
    if(cycle>=41 || cycle<=80){
        sprite[1]=".";
    }
    if(cycle>=81 || cycle<=120){
        sprite[2]=".";
    }
    if(cycle>=121 || cycle<=160){
        sprite[3]=".";
    }
    if(cycle>=161 || cycle<=200){
        sprite[4]=".";
    }
    if(cycle>=201 || cycle<=240){
        sprite[5]=".";
    }
}

function draw_sprite(program, crt_screen){
    var cycle = 0;
    var X = 1;
    var sprite_pos = [0, 1, 2];
    for(let line of program){
        var components = line.split(" ");
        var instruction = components[0];
        if(instruction==="noop"){
            cycle++;
            update_sprite(cycle, X, sprite_pos);
        }
        else{
            cycle++;
            update_sprite(cycle, X, sprite_pos);
            cycle++;
            update_sprite(cycle, X, sprite_pos);
            // var value = components[1];
            X+=Number(components[1]);
        }
    }
    console.log("CRT")
}

// Part 1
var sum_signal_strengths = add_signal_strengths(input)
                        .reduce(
                            function (x, y){
                                return x+y;
                            }, 0);

console.log(sum_signal_strengths);

// Part 2
var crt_screen = [
                    "########################################".split(''),
                    "########################################".split(''),
                    "########################################".split(''),
                    "########################################".split(''),
                    "########################################".split(''),
                    "########################################".split('')
                        ]
// console.log(crt_screen);
draw_sprite(test, crt_screen);
