const button = document.querySelector('.button');
const closeButton = document.querySelector('.closeRules');
const result = document.getElementById('count');
const paperButton = document.getElementById('paper__button');
const scissorButton = document.getElementById('scissor__button');
const rockButton = document.getElementById('rock__button');
const playAgainButton = document.getElementById('play__button');
const game = document.getElementById('game');
const resultDashboard = document.getElementById('result__dashboard');
const playAgain = document.querySelector('.play__again');

let resultStatus = document.getElementById('result__status');
let userChoice;
const playerWins = document.getElementById('player__wins');
const computerWins = document.getElementById('computer__wins');
let scoreCount = 0;

function startGame() {
    rpsbuttonClick();
    [paperButton, scissorButton, rockButton].forEach(element => {
        element.addEventListener('click', () => {
            compChoice();
            resultDashboard.style.display = 'block';
            game.style.display = 'none';

            setTimeout(() => {
                playAgain.style.display = 'block';
            }, 1000);

        });
    });
}

startGame();

button.addEventListener('click', () => {
    console.log('nice');
    document.querySelector('.rules').style.display = 'block'
    button.style.zIndex = -1;

    document.querySelector('.rules').animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });

});

closeButton.addEventListener('click', () => {
    button.style.zIndex = 0;
    document.querySelector('.rules').animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });

    setTimeout(() => { document.querySelector('.rules').style.display = 'none' }, 800)

});

playAgainButton.addEventListener('click', () => {
    resultDashboard.style.display = 'none';
    playAgain.style.display = 'none';
    game.style.display = 'block';
    playerWins.classList.remove('win');
    computerWins.classList.remove('win');

})

function rpsbuttonClick() {
    paperButton.addEventListener('click', () => {
        userChoice = 'paper';
        buttonClick('player__result__paper', 'player__result__scissor', 'player__result__rock');
    });

    scissorButton.addEventListener('click', () => {
        userChoice = 'scissor';
        buttonClick('player__result__scissor', 'player__result__paper', 'player__result__rock');
    });

    rockButton.addEventListener('click', () => {
        userChoice = 'rock';
        buttonClick('player__result__rock', 'player__result__paper', 'player__result__scissor');
    });
};

function compChoice() {
    let computerChoice = Math.random();

    if (computerChoice <= 0.34) {
        computerChoice = 'rock';
    } else if (computerChoice <= 0.67) {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissor';
    }

    if (computerChoice != null) {
        if (computerChoice === 'paper') {
            displayComputerChoice('computer__result__paper', 'computer__result__scissor', 'computer__result__rock');
        }
        else if (computerChoice === 'scissor') {
            displayComputerChoice('computer__result__scissor', 'computer__result__paper', 'computer__result__rock');
        }
        else if (computerChoice === 'rock') {
            displayComputerChoice('computer__result__rock', 'computer__result__scissor', 'computer__result__paper');
        }
    }

    function compare(user, computer) {
        user = userChoice;
        computer = computerChoice;
        console.log(computer);

        if (user === computer) {
            tie();
        } else {
            switch (user) {
                case 'rock': {
                    (computer === 'scissor') ? playerWin() : computerWin();
                    break;
                }
                case 'paper': {
                    (computer === 'rock') ? playerWin() : computerWin();
                    break;
                }
                case 'scissor': {
                    (computer === 'paper') ? playerWin() : computerWin();
                    break;
                }
            }
        }

    }

    setTimeout(compare, 1000);
};

function playerWin() {
    resultStatus.innerHTML = 'you win';
    playerWins.classList.add('win');
    computerWins.classList.remove('win');
    playAgainButton.style.color = 'hsl(229, 64%, 46%)'
    scoreCount += 1;
    result.innerHTML = scoreCount;
};

function computerWin() {
    resultStatus.innerHTML = 'you lose';
    playAgainButton.style.color = 'hsl(349, 71%, 52%)'
    computerWins.classList.add('win');
    playerWins.classList.remove('win');
    scoreCount -= 1;
    result.innerHTML = scoreCount;
}

function tie() {
    playerWins.classList.remove('win');
    computerWins.classList.remove('win');
    playAgainButton.style.color = 'hsl(229, 64%, 46%)'
    resultStatus.innerHTML = 'tie';
    scoreCount += 0;
    result.innerHTML = scoreCount;
};

function buttonClick(show, hide1, hide2) {
    document.querySelector(`.${show}`).style.display = 'block';
    document.querySelector(`.${hide1}`).style.display = 'none';
    document.querySelector(`.${hide2}`).style.display = 'none';
};

function displayComputerChoice(para1, para2, para3) {
    document.querySelector(`.${para1}`).style.display = 'block';
    document.querySelector(`.${para1}`).style.opacity = '0';
    setTimeout(() => {
        document.querySelector(`.${para1}`).style.opacity = '1';
    }, 800);

    document.querySelector(`.${para2}`).style.display = 'none';
    document.querySelector(`.${para3}`).style.display = 'none';
};