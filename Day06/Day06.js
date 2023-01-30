const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()


function is_marker(string){
    /*
    This function checks if 
    a 4-character string has any repeating characters
    */
    return /(.).*\1/.test(string);
}

function sliding_window(buffer, marker_length){
    var i;
    for(i = 0; i<buffer.length-marker_length; i++){
        let s = buffer.slice(i, i+marker_length);
        // console.log(i, s);
        if(!is_marker(s)){
            // console.log(is_marker(s));
            break;
        }
    }

    return i+marker_length;
}

// Part 1
console.log(sliding_window(input, 4));

// Part 2
console.log(sliding_window(input, 14));
