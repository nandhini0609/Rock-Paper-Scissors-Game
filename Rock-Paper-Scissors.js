let computerMove = '';
function pickChoice() {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
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
        playGame('Rock');
    } else if (event.key === 'p') {
        playGame('Paper');
    } else if (event.key === 's') {
        playGame('Scissors')
    }
})



function playGame(playerMove) {
    const functionMove = pickChoice();

    let result = '';

    if (playerMove === 'Rock') {
        if (functionMove === 'Rock') {
            result = 'Tie';
        } else if (functionMove === 'Paper') {
            result = 'Win';
        } else if (functionMove === 'Scissors') {
            result = 'loss'
        }
    } else if (playerMove === 'Paper') {
        if (functionMove === 'Rock') {
            result = 'loss';
        } else if (functionMove === 'Paper') {
            result = 'Tie';
        } else if (functionMove === 'Scissors') {
            result = 'Win'
        }
    } else if (playerMove === 'Scissors') {

        if (functionMove === 'Rock') {
            result = 'loss';
        } else if (functionMove === 'Paper') {
            result = 'Win';
        } else if (functionMove === 'Scissors') {
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



