const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function get_common_char_priority_score(string){
    let total_size = string.length;
    let compartment_1 = new Set(
                            string.slice(0,(total_size/2))
                                  .split('')
                        );
    let compartment_2 = new Set(
                            string.slice((total_size/2), total_size)
                                  .split('')
                        );

    // Get Common Characters 
    const intersection = [];

    for(let char of compartment_1.values()){
        if(compartment_2.has(char)){
            intersection.push(char);
        }
    }

    /*
    a - z have priorities 1 - 26.
    A - Z have priorities 27 - 52.

    This handles cases where strings have more than 1 common character
    */
    let sum = 0;
    intersection.forEach( 
        (char,index) => {
            // A-Z
            if(char === char.toUpperCase()){
                sum+= parseInt(char, 36) - 9 + 26
            }
            // a-z
            if(char === char.toLowerCase()){
                sum+= parseInt(char, 36) - 9;
            }
        }
    )

    return sum;
}

function get_common_char_group_priority_score(group){
    let elve_1 = new Set(group[0]);
    let elve_2 = new Set(group[1]);
    let elve_3 = new Set(group[2]);

    let intersection = [elve_1, elve_2, elve_3].reduce(
        (a, b) => new Set(
            [...a].filter(x => b.has(x))
        )
    )

    /*
    a - z have priorities 1 - 26.
    A - Z have priorities 27 - 52.

    This handles cases where strings have more than 1 common character
    */
    let sum = 0;
    [...intersection].forEach( 
        (char,index) => {
            // A-Z
            if(char === char.toUpperCase()){
                sum+= parseInt(char, 36) - 9 + 26
            }
            // a-z
            if(char === char.toLowerCase()){
                sum+= parseInt(char, 36) - 9;
            }
        }
    )

    return sum;
}

// Part 1
let priority_sum = input.map(get_common_char_priority_score).reduce((a, b) => a + b, 0)
console.log(priority_sum);

// Part 2
let elves_per_group = 3;
let TwoDim_input = [];
while(input.length){
    TwoDim_input.push(input.splice(0,elves_per_group));
}

let group_priority_sum = TwoDim_input.map(get_common_char_group_priority_score).reduce((a, b)=> a + b, 0);
console.log(group_priority_sum);
