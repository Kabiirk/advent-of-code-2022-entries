const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');


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

function draw_crt(instructions){
    let part2 = '\n';
    let X = 1;
    let cycles = 0;
    for(const line of instructions){
        var parsed_line = line.split(" ");
        var cmd = parsed_line[0];
        if(parsed_line.length===2){
            var arg = Number(parsed_line[1]);
        }

        let duration = cmd==="addx" ? 2 : 1;

        while(duration > 0){
            const sprite = Array(40).fill(0)
                            .map( (_, i) => [X-1, X, X+1].includes(i) ? '▓' : '▒' )

            part2 += sprite[cycles % 40];
            
            cycles++

            if( cycles%40 === 0 ){
                part2+="\n";
            }

            duration--;
        }
        if(cmd === "addx"){
            X+=arg;
        }
    }

    return part2;
}

// Part 1
var sum_signal_strengths = add_signal_strengths(input)
                        .reduce(
                            function (x, y){
                                return x+y;
                            }, 0);

console.log(sum_signal_strengths);// 13220

// Part 2
var crt_screen = draw_crt(input);
console.log(crt_screen);// RUAKHBEK
/*


▓▓▓  ▓  ▓  ▓▓  ▓  ▓ ▓  ▓ ▓▓▓  ▓▓▓▓ ▓  ▓ 
▓  ▓ ▓  ▓ ▓  ▓ ▓ ▓  ▓  ▓ ▓  ▓ ▓    ▓ ▓  
▓  ▓ ▓  ▓ ▓  ▓ ▓▓   ▓▓▓▓ ▓▓▓  ▓▓▓  ▓▓   
▓▓▓  ▓  ▓ ▓▓▓▓ ▓ ▓  ▓  ▓ ▓  ▓ ▓    ▓ ▓  
▓ ▓  ▓  ▓ ▓  ▓ ▓ ▓  ▓  ▓ ▓  ▓ ▓    ▓ ▓  
▓  ▓  ▓▓  ▓  ▓ ▓  ▓ ▓  ▓ ▓▓▓  ▓▓▓▓ ▓  ▓ 

*/
