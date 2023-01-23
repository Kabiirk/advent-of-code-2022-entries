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
    let win = 6;
    let lose = 0;
    let draw = 3;
    let rock = 1
    let paper = 2
    let scissor = 3
    // Player Chooses Rock
    if(player === 'X'){
        // Win
        if(opponent==='C'){
            return win+rock
        }
        // Lose
        else if(opponent==='B'){
            return lose+rock
        }
        // Draw
        else{
            return draw+rock
        }
    }
    // Player Chooses Paper
    if(player === 'Y'){
        // Win
        if(opponent==='A'){
            return win+paper
        }
        // Lose
        else if(opponent==='C'){
            return lose+paper
        }
        // Draw
        else{
            return draw+paper
        }
    }
    // Player Chooses Scissors
    if(player === 'Z'){
        // Win
        if(opponent==='B'){
            return win+scissor
        }
        // Lose
        else if(opponent==='A'){
            return lose+scissor
        }
        // Draw
        else{
            return draw+scissor
        }
    }
}


// Part 2
/*
X - lose
Y - draw
Z - win
A - Rock (1)
B - Paper (2)
C - Scissor (3)

Win - 6
Lose - 0
Draw - 3
*/
function decide_score_after_action(player_choice){
    let opponent = player_choice.charAt(0);
    let action = player_choice.charAt(2);
    let win = 6;
    let lose = 0;
    let draw = 3;
    let rock = 1
    let paper = 2
    let scissor = 3
    
    // Opponent Chooses Rock
    if(opponent === 'A'){
        // Win
        if(action==='Z'){// Paper
            return win+paper
        }
        // Lose
        else if(action==='X'){// Scissor
            return lose+scissor
        }
        // Draw
        else{
            return rock+draw
        }
    }
    // Opponent Chooses Paper
    if(opponent === 'B'){
        // Win
        if(action==='Z'){// Scissor
            return win+scissor
        }
        // Lose
        else if(action==='X'){// Rock
            return lose+rock
        }
        // Draw
        else{
            return draw+paper
        }
    }
    // Opponent Chooses Scissors
    if(opponent === 'C'){
        // Win
        if(action==='Z'){// Rock
            return win+rock
        }
        // Lose
        else if(action==='X'){// Paper
            return lose+paper
        }
        // Draw
        else{
            return draw+scissor;
        }
    }
}

// Part 1
let rps_pair = input.map(decide_score).reduce((a, b) => a + b, 0)
console.log(rps_pair)

// Part 2
let rps_action = input.map(decide_score_after_action).reduce((a, b) => a + b, 0)
console.log(rps_action)