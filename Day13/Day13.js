const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n').map((row) => row.split('\n'));


// console.log(input);

var test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
test = test.split("\n\n").map((row) => row.split('\n'));

// console.log(test);

const compare = (a, b) => {
    if(Array.isArray(a) && !Array.isArray(b)){
        b = [b];
    }
    if(!Array.isArray(a) && Array.isArray(b)){
        a = [a];
    }

    if(!Array.isArray(a) && !Array.isArray(a)){
        if(a<b){
            return 1;
        }
        if(a === b){
            return 0;
        }
        return -1;
    }

    // Iterate until either left or right is greater
    if(Array.isArray(a) && Array.isArray(a)){
        let i = 0;
        while(i < a.length && b.length){
            const res = compare(a[i], b[i]);
            if(res === 1 || res === -1){
                return res;
            }
            i++;
        }

        if(i === a.length ){
            if(a.length === b.length){
                return 0;
            }
            return 1;
        }

        return -1;
    }
}

function indice_pair(parts){
    var result = [];

    for(let i = 0; i<parts.length; i++){
        // const p = parts[i];
        const a = eval(parts[i][0]);
        const b = eval(parts[i][1]);
        // console.log("eval: ",a);
        // console.log("eval: ",b);

        if(compare(a,b) === 1)[
            result.push(i+1)
        ]
    }
    // console.log(result);

    return result.reduce((a, b) => a + b, 0);
}

// Part 1
var correct_indice_sum = indice_pair(input);
console.log(correct_indice_sum);// 5806

// Part 2


var s = 0;