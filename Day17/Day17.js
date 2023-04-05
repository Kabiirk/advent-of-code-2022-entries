const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

console.log(input);


/*
The 5 Rocks

####

------

.#.
###
.#.

------

..#
..#
###

------

#
#
#
#

------

##
##
 */

// The Rock
class Dwayne{
    constructor(height, width, shape){
        this.height = height;
        this.width = width;
        this.shape = shape;
    }
    toString(){
        return this.shape
    }
}

var test = new Dwayne(1, 4, '####');
console.log(test);

const settledRock = new Set();

const checkCollision = (rock) => {
  for (let piece of rock) {
    if (settledRock.has(`${piece.x},${piece.y}`)) return "ROCK";
    if (piece.y <= 0) return "FLOOR";
    if (piece.x <= 0 || piece.x >= 8) return "WALL";
  }
  return false;
};

const updatePosition = (rock, tallestPoint) => {
  rock.forEach((piece) => {
    piece.y += tallestPoint + 4;
    piece.x += 3;
  });
  return rock;
};

const findTallestPoint = (rock, tallestPoint) => {
  for (let piece of rock) {
    tallestPoint = Math.max(tallestPoint, piece.y);
  }
  return tallestPoint;
};

let remainingPattern = [...pattern];
let tallestPoint = 0;
for (let i = 0; i < 2022; i++) {
  let rocksCopy = JSON.parse(JSON.stringify(rocks));

  let rock = rocksCopy[i % rocks.length];
  rock = updatePosition(rock, tallestPoint);

  let isFallNextMove = false;
  while (true) {
    if (isFallNextMove) {
      rock.forEach((piece) => {
        piece.y -= 1;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "FLOOR") {
        // Revert the fall and add the rock to the settledRock set
        rock.forEach((piece) => {
          piece.y += 1;
          settledRock.add(`${piece.x},${piece.y}`);
        });
        tallestPoint = findTallestPoint(rock, tallestPoint);
        break;
      }
    } else {
      let xMove = remainingPattern.shift() === ">" ? 1 : -1;
      if (remainingPattern.length === 0) remainingPattern = [...pattern];
      rock.forEach((piece) => {
        piece.x += xMove;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "WALL") {
        // Revert the move
        rock.forEach((piece) => {
          piece.x -= xMove;
        });
      }
    }
    isFallNextMove = !isFallNextMove;
  }
}

console.log(tallestPoint);

console.timeEnd("ExecutionTime");