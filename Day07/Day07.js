const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

for(var i = 0; i<input.length; i++) {
    input[i] = input[i].split(" ");
}


var active_directory = [];
var directory_tree = {};

function nested_assign( pathlist, value ){
    var schema = directory_tree;
    var len = pathlist.length;
    for(var k=0; k<len-1; k++){
        var elem = pathlist[k];
        if(!schema[elem]){schema[elem]={}}
        schema = schema[elem];
    }
    schema[pathlist[len-1]] = value;
};

// Create directory Tree
for(var j = 0; j<input.length; j++) {
    var std_out = input[j];
    // command
    if(std_out[0]==="$"){
        // cd
        if(std_out[1]==="cd"){
            // /
            if(std_out[2]==="/"){
                active_directory.push("/");
                directory_tree["/"] = {};
            }
            // ..
            else if(std_out[2]===".."){
                active_directory.pop();
            }
            // dir_name
            else{
                var dir_name = std_out[2];
                active_directory.push(dir_name);
            }
        }
        //ls
        if(std_out[1]==="ls"){
            continue;
        }
    }
    // dir
    else if(std_out[0]==="dir"){
        // directory_tree[active_directory[active_directory.length-1]][std_out[1]] = {};
        active_directory.push(std_out[1]);
        nested_assign(active_directory, {});
        active_directory.pop(std_out[1]);
    }
    // files
    else{
        // var filename = std_out[1];
        // var size = std_out[0];
        active_directory.push(std_out[1]);
        nested_assign(active_directory, Number(std_out[0]));
        active_directory.pop();
    }
}
// console.log(JSON.stringify(directory_tree, undefined, 2));


// Determine size of each directory
const sizes = {}

const dfs = (tree, path="/") => {
    let size = 0;

    Object.entries(tree).forEach(([name, content]) => {
            size+=
                typeof content === "object" ? dfs(content, path+">"+name) : content;
        }
    );

    sizes[path] = size;
    return size;
}

dfs(directory_tree)
// console.log(sizes);

// Part 1
// Find all directories under 100000 & add up their sizes
var sum = 0;
for (const [key, value] of Object.entries(sizes)){
    if(value<=100000){
        sum+=value;
    }
}
console.log(sum);// 1513699

// Part 2
// Total disk space available = 70000000
// Space required for running update = 30000000

var directory_sizes = [];
// Size of Root Directory
var total_occupied_space = Math.max( ...Object.values(sizes) );
var remaining_space = 70000000 - total_occupied_space;

for (const [key, value] of Object.entries(sizes)){
    if(remaining_space+value > 30000000){
        directory_sizes.push(value);
    }
}

console.log(Math.min(...directory_sizes));// 7991939