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
   let upper_range2 = Math.max(range_pairs[0], range_pairs[1]);
   let lower_range2 = Math.min(range_pairs[0], range_pairs[1]);
   // Range 1 fully has Range 2
    let full_overlap_1 = (upper_range1 >= upper_range2) && (lower_range1 <= lower_range2);
   // Range 2 fully has Range 1
    let full_overlap_2 = (upper_range1 <= upper_range2) && (lower_range1 >= lower_range2);

    return Number(full_overlap_1 || full_overlap_2);
}

let fully_contained = parsed_input.map(full_overlap);
console.log(fully_contained);