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

var test = `30373
25512
65332
33549
35390`.split("\n")

for(var i=0; i<test.length; i++){
    test[i] = test[i].split("").map(Number);
}

function check_line(y, x, tree){
    var top = true;// x,y->top
    var bottom = true;// x,y->bottom
    var left = true;// x,y->left
    var right = true;//// x,y->right
    // check top
    console.log("TOP");
    for(var t=y-1; t>=0; t--){
        console.log("Iter:", t,x, " Coords:",tree[t][x], tree[y][x])
        // if(tree[t][x]>tree[y][x]){
        //     top = false;
        // }
    }
    // check bottom
    console.log("BOTTOM");
    for(var b=y+1; b<=tree.length; b++){
        console.log("Iter:", b,x, " Coords:",tree[b], tree[y])
        // if(tree[b][x]>tree[y][x]){
        //     bottom = false;
        // }
    }
    // // Check left
    for(var l=x-1; l>=0; l--){
        console.log("Iter:", b,x, " Coords:",tree[b], tree[y])
        // if(tree[y][l]>tree[y][x]){
        //     left = false;
        // }
    }
    // // Check right
    // for(var r=x+1; r<=tree.length; r++){
    //     if(tree[y][r]>tree[y][x]){
    //         right = false;
    //     }
    // }
    // console.log(top, bottom, left, right);

    return top || bottom || left || right;
}

function visible_tree_count(tree_grid){
    const visible = new Set();
    return 0;
}

console.log(test);
console.log(check_line(2,2,test));

// console.log(test)
// console.log(input);