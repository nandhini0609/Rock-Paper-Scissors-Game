let computerMove = '';
function pickChoice() {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

let scoreObject = JSON.parse(localStorage.getItem('score'))

if (scoreObject === null) {
    scoreObject = {
        'wins': 0,
        'loss': 0,
        'Ties': 0
    }
    displayScore();

}
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors')
    }
})



function playGame(playerMove) {
    const functionMove = pickChoice();

    let result = '';

    if (playerMove === 'rock') {
        if (functionMove === 'rock') {
            result = 'Tie';
        } else if (functionMove === 'paper') {
            result = 'Win';
        } else if (functionMove === 'scissors') {
            result = 'loss'
        }
    } else if (playerMove === 'paper') {
        if (functionMove === 'rock') {
            result = 'loss';
        } else if (functionMove === 'paper') {
            result = 'Tie';
        } else if (functionMove === 'scissors') {
            result = 'Win'
        }
    } else if (playerMove === 'scissors') {

        if (functionMove === 'rock') {
            result = 'loss';
        } else if (functionMove === 'paper') {
            result = 'Win';
        } else if (functionMove === 'scissors') {
            result = 'Tie'
        }
    }

    if (result === 'Win') {
        scoreObject.wins += 1;
    } else if (result === 'loss') {
        scoreObject.loss += 1;
    } else if (result === 'Tie') {
        scoreObject.Ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(scoreObject));
    displayScore(result, playerMove, computerMove);
}
function resetScore() {
    scoreObject.wins = 0;
    scoreObject.loss = 0;
    scoreObject.Ties = 0;
    localStorage.removeItem('score');
}
function displayScore(result = '', playerMove = '', computerMove = '') {
    document.querySelector('.score').innerHTML = `${result}`;
    document.querySelector('.alert').innerHTML = ` You
        <img src="img/${playerMove}-emoji.png" alt="" class="move-icon">
        <img src="img/${computerMove}-emoji.png" alt="" class="move-icon">
        computer
`;
    document.querySelector('.full-score').innerHTML = ` Wins:${scoreObject.wins}, losses:${scoreObject.loss}, Ties:${scoreObject.Ties} `

}
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            const playerMove = pickChoice();
            playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    let autoPlayButton = document.querySelector('.autoPlay');
    if (autoPlayButton.innerHTML === 'Auto Play') {
        autoPlayButton.innerHTML = 'Stop AutoPlay'
    } else {
        autoPlayButton.innerHTML = 'Auto Play';
    }
}



