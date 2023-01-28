const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

let pattern = /\d{1,2}/g;
let parsed_input = [];
// 75-76,18-75
for(let i=0; i<input.length; i++){
    parsed_input.push(input[i].match(pattern).map(
        function(num){
            return parseInt(num, 10);
        }
    ));
}

// Part 1
function get_Intersection(setA, setB) {
    const intersection = new Set(
        [...setA].filter(element => setB.has(element))
    );
    return intersection;
}

function set_equality(setA, setB){
    setA.size === setB.size &&
    [...setA].every((x) => setB.has(x))
}

function full_overlap(range_pairs){
    /*
    E.g.:
    range_pairs = [82, 83, 78, 82]

    Range 1
    range_pairs[0] to range_pairs[1]
    Range 2
    range_pairs[2] to range_pairs[3]
    */
    // Max and Min can be avoided, I am assuming 
    // For cases where lower bound maybe given before
    // upper bound
    let upper_range1 = Math.max(range_pairs[0], range_pairs[1]);
    let lower_range1 = Math.min(range_pairs[0], range_pairs[1]);
    let upper_range2 = Math.max(range_pairs[2], range_pairs[3]);
    let lower_range2 = Math.min(range_pairs[2], range_pairs[3]);
    // Range 1
    let range_1 = new Set();
    let range_2 = new Set();
    for(var i = lower_range1; i<= upper_range1; i++){
        range_1.add(i)
    }
    for(var j = lower_range2; j<= upper_range2; j++){
        range_2.add(j)
    }

    let intersection = get_Intersection(range_1, range_2);

    // For this problem, just checking length workes
    // Normally, equality between 2 sets should be determined
    // by set_equality()
    if(intersection.size===range_1.size || intersection.size===range_2.size){
        return Number(true);
    }
    else{
        return Number(false);
    }
}

// Part 1
let fully_contained = parsed_input.map(full_overlap).reduce((a, b) => a + b, 0);
console.log(fully_contained);