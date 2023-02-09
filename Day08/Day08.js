const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

for(var i=0; i<input.length; i++){
    input[i] = input[i].split("").map(Number);
}

function check_visibility(y, x, tree){
    var top = true;// x,y->top
    var bottom = true;// x,y->bottom
    var left = true;// x,y->left
    var right = true;// x,y->right
    // check top
    // console.log("TOP");
    for(var t=y-1; t>=0; t--){
        // console.log("Iter:", t,x, " Coords:",tree[t][x], tree[y][x])
        if(tree[t][x]>=tree[y][x]){
            top = false;
        }
    }
    // check bottom
    // console.log("BOTTOM");
    for(var b=y+1; b<tree.length; b++){
        // console.log("Iter:", b,x, " Coords:",tree[b][x], tree[y][x])
        if(tree[b][x]>=tree[y][x]){
            bottom = false;
        }
    }
    // Check left
    // console.log("LEFT");
    for(var l=x-1; l>=0; l--){
        // console.log("Iter:", y,l, " Coords:",tree[y][l], tree[y][x])
        if(tree[y][l]>=tree[y][x]){
            left = false;
        }
    }
    // Check right
    // console.log("RIGHT");
    for(var r=x+1; r<tree.length; r++){
        // console.log("Iter:", y,r, " Coords:",tree[y][r], tree[y][x])
        if(tree[y][r]>=tree[y][x]){
            right = false;
        }
    }
    // console.log(top, bottom, left, right);

    return top || bottom || left || right;
}

function get_scenic_score(y, x, tree){
    var top = 0;// x,y->top
    var bottom = 0;// x,y->bottom
    var left = 0;// x,y->left
    var right = 0;// x,y->right
    // check top
    for(var t=y-1; t>=0; t--){
        if(tree[t][x]>=tree[y][x]){
            top++;
            break;
        }
        else{
            top++;
        }
    }
    // check bottom
    for(var b=y+1; b<tree.length; b++){
        if(tree[b][x]>=tree[y][x]){
            bottom++;
            break;
        }
        else(
            bottom++
        )
    }
    // Check left
    for(var l=x-1; l>=0; l--){
        if(tree[y][l]>=tree[y][x]){
            left++;
            break;
        }
        else{
            left++;
        }
    }
    // Check right
    for(var r=x+1; r<tree.length; r++){
        if(tree[y][r]>=tree[y][x]){
            right++;
            break;
        }
        else{
            right++
        }
    }
    // console.log("top: ",top," Left: ", left," Bottom: ", bottom," Right: ", right);

    return top * left * bottom * right;
}


// Part 1
// Account for all the corners being visible
var count = 4*(input.length-1);

for(var y = 1; y<input.length-1; y++){
    for(var x = 1; x<input[y].length-1; x++){
        if(check_visibility(y, x, input)){
            count++;
            // console.log(count, test[y][x])
        }
    }
}

console.log(count);// 1693

// Part 2
var scenic_scores = []

for(var y = 1; y<input.length-1; y++){
    for(var x = 1; x<input[y].length-1; x++){
        scenic_scores.push(get_scenic_score(y, x, input));
    }
}

console.log(Math.max( ...scenic_scores ))// 422059
