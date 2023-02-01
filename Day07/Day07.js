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

test_string = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
var test_input = test_string.split("\n")
for(var i = 0; i<test_input.length; i++) {
    test_input[i] = test_input[i].split(" ");
}

// Create Directory Tree
/*
{
    "/":{
        "a":{
            "e":{
                "i":584,
            },
            "f":29116,
            "g":2557,
            "h.list":62596,
        }
        "b.txt":14848514,
        "c.dat":8504156,
        "d":{
            "j":4060174,
            "d.log":8033020,
            "d.ext":5626152,
            "k":7214296,
        }
    }
}
*/
function nested_assign(root_dict, path_list, value) {
    for( var i = 0; i < path_list.length; i++ ) {
        root_dict = root_dict[ path_list[i] ] = root_dict[ path_list[i] ] || value;
    }
}

var active_directory = [];
var directory_tree = {};
/*
for(var j = 0; j<test_input.length; j++) {
    var std_out = test_input[j];
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
        nested_assign(directory_tree, active_directory, {});
    }
    // files
    else{
        var filename = std_out[1];
        var size = std_out[0];
        active_directory.push(filename);
        nested_assign(directory_tree, active_directory, size);
        active_directory.pop();
    }
}
console.log(directory_tree);
*/

// DFS for size of each directory


// Find all directories under 100000 & add up their sizes
// console.log(test_input)

var a = {}