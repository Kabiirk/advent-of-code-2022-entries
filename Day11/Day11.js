const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

let test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

test = test.split("\n\n");

// Parse input
function parse_input(text_input){
    let monkey_objects = [];
    for(var i=0; i<text_input.length; i++){
        var monkey_object = {};
        monkey = text_input[i].split("\n").map( x => x.trim() );

        pattern = /\d+/g;
        monkey_object["id"] = Number( monkey[0].match(pattern)[0] );
        monkey_object["starting_item"] = monkey[1].match(pattern).map( x => Number(x) );
        monkey_object["operation"] = {};
        let op_data = monkey[2].split(" ");
        monkey_object["operation"]["op_sign"] = monkey[2].split(" ").reverse()[1];
        if(op_data.reverse()[0]==="old"){
            monkey_object["operation"]["value"] = "old"
        }
        else{
            monkey_object["operation"]["value"] = Number( monkey[2].match(pattern) );
        }
        monkey_object["div_test"] = {};
        monkey_object["div_test"]["by"] = Number( monkey[3].match(pattern) );
        monkey_object["div_test"]["true"] = Number( monkey[4].match(pattern) );
        monkey_object["div_test"]["false"] = Number( monkey[5].match(pattern) );
        monkey_object["inspect_count"] = 0;

        monkey_objects.push(monkey_object);
    }

    return monkey_objects;
}

// Helper function to handle operators
function parse_op(base_val, sign, val){
    if(sign === "+"){
        return base_val + val;
    }
    if(sign === "*"){
        return base_val * val;
    }
}

// Part 1 & Part 2
function simulate_throws(monkey_input, num_moves, relief){
    // ===========================================//
    // Part 2 : Another Way to handle stress
    var mod_all = 1
    if(!relief){
        for(var mon of monkey_input){
            mod_all *= mon.div_test.by;
        }
    }
    // ===========================================//

    // Simulate Moves
    for(var i = 0; i<num_moves; i++){

        // Iterate over all Monkeys and simulate their throws
        for(var k = 0; k<monkey_input.length; k++){
            if(monkey_input[k].starting_item.length === 0){
                continue;
            }
            while( monkey_input[k].starting_item.length != 0 ){
                var item = monkey_input[k].starting_item.shift();
                let new_item = -1;
                if(monkey_input[k].operation.value === "old"){
                    new_item = parse_op(item, 
                                   monkey_input[k].operation.op_sign,
                                   item
                                );
                }
                else{
                    new_item = parse_op(item, 
                                    monkey_input[k].operation.op_sign,
                                    monkey_input[k].operation.value
                                );
                }

                // Adjust Stress Level as per problem
                let bored_item = 0;
                if(relief){
                    bored_item = Math.floor( new_item/3 );
                }
                else{
                    bored_item = new_item%mod_all
                }

                // Item Transfer
                if(bored_item % monkey_input[k].div_test.by === 0){
                    monkey_input[monkey_input[k].div_test.true].starting_item.push(bored_item);
                }
                else{
                    monkey_input[monkey_input[k].div_test.false].starting_item.push(bored_item);
                }

                // Increment once Monkey has inspected that Item
                monkey_input[k].inspect_count++;
            }
        }
    }

    var inspect_counter = []
    for(var mon of monkey_input){
        // console.log("Monkey ",mon.id, " inspected items ", mon.inspect_count, " times.");
        inspect_counter.push(mon.inspect_count);
    }

    return inspect_counter;
}

// Need a p1_state & p2_state because
// Part 2 needs to be calculated from
// initial state
let p1_state = parse_input(input);
let p2_state = parse_input(input);


// Part 1
var count_freq = simulate_throws(p1_state, 20, true).sort( function(a, b){return b - a} );
console.log(count_freq[0]*count_freq[1]);// 78960
/*
Monkey  0  inspected items  280  times.
Monkey  1  inspected items  133  times.
Monkey  2  inspected items  152  times.
Monkey  3  inspected items  5  times.
Monkey  4  inspected items  137  times.
Monkey  5  inspected items  282  times.
Monkey  6  inspected items  276  times.
Monkey  7  inspected items  150  times.
*/

// Part 2
var count_freq_stress = simulate_throws(p2_state, 10000, false).sort( function(a, b){return b - a} );
console.log(count_freq_stress[0]*count_freq_stress[1]);// 14561971968
/*
Monkey  0  inspected items  118588  times.
Monkey  1  inspected items  60301  times.
Monkey  2  inspected items  60417  times.
Monkey  3  inspected items  60268  times.
Monkey  4  inspected items  60273  times.
Monkey  5  inspected items  120704  times.
Monkey  6  inspected items  120642  times.
Monkey  7  inspected items  60483  times.
*/
