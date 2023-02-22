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
for(var i=0; i<test.length; i++){
    var monkey_object = {};
    monkey = test[i].split("\n").map( x => x.trim() );

    pattern = /\d+/g;
    monkey_object["id"] = Number( monkey[0].match(pattern)[0] );
    monkey_object["starting_item"] = monkey[1].match(pattern).map( x => Number(x) );
    monkey_object["operation"] = {};
    monkey_object["operation"]["op_sign"] = monkey[2].split(" ").reverse()[1];
    monkey_object["operation"]["value"] = Number( monkey[2].match(pattern) );
    monkey_object["div_test"] = {};
    monkey_object["div_test"]["by"] = Number( monkey[3].match(pattern) );
    monkey_object["div_test"]["true"] = Number( monkey[4].match(pattern) );
    monkey_object["div_test"]["false"] = Number( monkey[5].match(pattern) );
    monkey_object["inspect_count"] = 0;

    test[i] = monkey_object;
}

// console.log(input);

function parse_op(base_val, sign, val){
    if(sign === "+"){
        return base_val + val;
    }
    if(sign === "*"){
        return base_val * val;
    }
}

// Part 1
for(var i = 0; i<5; i++){
    for(var monkey of test){
        console.log("StartItem monkey ",i," ",monkey.starting_item);
        if(monkey.starting_item.length === 0){
            break;
        }
        for(var j = 0; j<monkey.starting_item.length; j++){
            var item = monkey.starting_item.shift();
            let new_item = parse_op(item, 
                                    monkey.operation.op_sign,
                                    monkey.operation.value
                            );
            let bored_item = Math.floor( new_item/3 )
            if(bored_item % monkey.div_test.by === 0){
                test[monkey.div_test.true].starting_item.push(new_item);
                // console.log("gone to monkey ", monkey.div_test.true);
            }
            else{
                test[monkey.div_test.false].starting_item.push(new_item);
                // console.log("gone to monkey ", monkey.div_test.false);
            }
            monkey.inspect_count++;
        }
    }
    console.log("Round ", i);
    for(var mon of test){
        console.log(mon.starting_item);
    }
    console.log("=======\n");
}

// console.log(test);

var s = 0;