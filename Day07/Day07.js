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


// DFS for size of each directory


// Find all directories under 100000 & add up their sizes
console.log(test_input)