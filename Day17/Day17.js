const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('')

var dwayne = [
    [
        ['#','#','#','#']
    ],
    [
        ['.','#','.'],
        ['#','#','#'],
        ['.','#','.']
    ],
    [
        ['.','.','#'],
        ['.','.','#'],
        ['#','#','#']
    ],
    [
        ['#'],
        ['#'],
        ['#'],
        ['#']
    ],
    [
        ['#','#'],
        ['#','#']
    ]
]

let chamber = [["#", "#", "#", "#", "#", "#", "#", "#", "#"]]
let segment = ["#", ".", ".", ".", ".", ".", ".", ".", "#"]
let steps = 1000000000000
let blockIndex = 0
let numBlocks = dwayne.length
let numjets = input.length
let topIndex = 1
let jetIndex = 0

var part_1 = 0;
var part_2 = 0;

function collision(block, blockX, blockY) {
    return block.some((r, y) => {
        return r.some((state, x) => {
            return state == "#" && chamber[blockY + y][blockX + x] == "#"
        })
    })
}

function checkRepeat() {
    let l = topIndex - 1
    let max = ~~(chamber.length / 2) - 5
    let len = max
    for (len; len > input.length / 5; len--) {
        let same = true
        for (let i = 0; i < len; i++) {
            if (!chamber[l - i].every((el, ix) => el === chamber[l - (i + len)][ix])) {
                same = false
                break
            }
        }
        if(same){
            return len;
        }
    }

    return -1;
}

let repeatFound = false
let repeatLength = 0
let repeatNext = 0
let repeatStep = 0
let mult = 0
while(steps--){
    let block = dwayne[blockIndex]
    let blockHeight = block.length
    let blockY = topIndex+3;
    let blockX = 3;
    while(blockY + blockHeight > chamber.length){
        chamber.push(segment.slice())
    }

    while(true){
        let jet = input[jetIndex++ % numjets] == "<" ? -1:+1;

        if(!collision(block, blockX+jet, blockY)){
            blockX+=jet;
        }
        if(!collision(block, blockX, blockY-1)){
            blockY--;
        }
        else{
            block.forEach((r, y) => {
                r.forEach((state, x) => {
                    if (state == "#"){ chamber[blockY + y][blockX + x] = state; }
                })
            })
            topIndex = Math.max(blockY + blockHeight, topIndex)
            break
        }
    }

    if (mult === 0) {
        if (!repeatFound) {
            let repeat = checkRepeat()
            if (repeat != -1) {
                repeatFound = true
                repeatNext = topIndex + repeat
                repeatLength = repeat
                repeatStep = steps
            }
        } else if (repeatNext == topIndex) {
            repeatStep = repeatStep - steps
            mult = Math.floor(steps / repeatStep)
            let rest = steps % repeatStep
            steps = rest
        }
    }
    if (1000000000000 - steps == 2022){
        part_1 = topIndex - 1
    }
    if (++blockIndex == numBlocks) blockIndex = 0
}

part_2 = topIndex - 1 + mult * repeatLength;
console.log(part_1);
console.log(part_2);
