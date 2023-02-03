# creates Boilerplate files for JavaScript solution
# Along with a template README.md for Day XX

# How to Run :
# bash boilerplate.sh XX

# where XX => 01, 02, 03 ... 23, 24, 25

# E.g. :
# 1.
# bash boilerplate.sh 12
# creates Boilerplate files for both C++ & Python solutions
# Along with a template README.md for Day12

if [ $# -ne 1 ]
  then
    echo "Improper number of arguments supplied"
    exit 1
fi

if [ -d  "$1" ]
  then
    echo "Folder by this name exists"
    echo "Choose a different name"
    exit 1
fi

mkdir Day$1/

echo "const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');" > Day$1/Day$1.js;

echo "
### **--- $1: ---**
> **My Answer :**
[Code]()
 
------
 
### **--- $1: (Part Two) ---**
> **My Answer :**
[Code]()
" > Day$1/README.md