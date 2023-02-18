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
        if([X, X+1, X+2].includes()){
            return 0;
        }
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
            draw_crt();
            check_cycle(cycle, sprite_pos);
        }
        else{
            cycle++;
            check_cycle(cycle, sprite_pos);
            cycle++;
            update_sprite(cycle, sprite_pos);
            // var value = components[1];
            X+=Number(components[1]);
            check_cycle(cycle, sprite_pos);
        }
    }
    console.log("CRT")
}

// New Approach
function adjust_row_col(cycle, row, column){
    var reset_list = [0, 40, 80, 120, 160, 200]
    if(reset_list.includes(cycle)){
        column = reset_list.indexOf(cycle);
        row = 0;
    }
    return [row, column];
}

function draw_pixel(cycle, sprite_pos, r, c){
    if(sprite_pos.includes(cycle)){
        return [r, c, "#"];
    }
    else{
        return [r, c, "."];
    }
}

function draw_crt(program, crt_screen){
    var cycle = 0;
    var X = 1;
    var sprite_pos = [0, 1, 2];
    var column = 0;
    var row = 0;
    for(let line of program){
        var components = line.split(" ");
        var instruction = components[0];
        if(instruction==="noop"){
            cycle++;
            row++
            var temp = adjust_row_col(cycle, row, column);
            row = temp[0];
            column = temp[1];
            var temp2 = draw_pixel(cycle, sprite_pos, row, column);
            crt_screen[temp[1]][temp[0]] = temp[2];
        }
        else{
            cycle++;
            row++;
            var temp = adjust_row_col(cycle, row, column);
            row = temp[0];
            column = temp[1];
            var temp2 = draw_pixel(cycle, sprite_pos, row, column);
            crt_screen[temp[1]][temp[0]] = temp[2];
            cycle++;
            row++;
            var temp = adjust_row_col(cycle, row, column);
            row = temp[0];
            column = temp[1];
            var temp2 = draw_pixel(cycle, sprite_pos, row, column);
            crt_screen[temp[1]][temp[0]] = temp[2];
            X+=Number(components[1]);
            sprite_pos = [X-1, X, X+1];
        }
    }
    // return signal_strengths;
}


//

// Part 1
var sum_signal_strengths = add_signal_strengths(input)
                        .reduce(
                            function (x, y){
                                return x+y;
                            }, 0);

console.log(sum_signal_strengths);// 13220

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
// draw_sprite(test, crt_screen);
draw_crt(test, crt_screen);
console.log(crt_screen);
var s = 0;