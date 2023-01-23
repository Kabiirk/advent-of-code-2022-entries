const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

/*
A,X - Rock (1)
B,Y - Paper (2)
C,Z - Scissor (3)

Win - 6
Lose - 0
Draw - 3
*/
function decide_score(player_choice){
    let opponent = player_choice.charAt(0);
    let player = player_choice.charAt(2);
    // Player Chooses Rock
    if(player === 'X'){
        // Win
        if(opponent==='C'){
            return 7//1+6
        }
        // Lose
        else if(opponent==='B'){
            return 1//1+0
        }
        // Draw
        else{
            return 4//1+3
        }
    }
    // Player Chooses Paper
    if(player === 'Y'){
        // Win
        if(opponent==='A'){
            return 8//2+6
        }
        // Lose
        else if(opponent==='C'){
            return 2//2+0
        }
        // Draw
        else{
            return 5//2+3
        }
    }
    // Player Chooses Scissors
    if(player === 'Z'){
        // Win
        if(opponent==='B'){
            return 9//3+6
        }
        // Lose
        else if(opponent==='A'){
            return 3//3+0
        }
        // Draw
        else{
            return 6//3+3
        }
    }
}

// Part 1
let rps_pair = input.map(decide_score).reduce((a, b) => a + b, 0)

// Part 2

console.log(rps_pair)