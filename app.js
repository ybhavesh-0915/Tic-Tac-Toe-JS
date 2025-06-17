let boxes = document.getElementsByClassName("box");
let winnerSpan = document.getElementById("winner")
let turn;
let turnCounter = 0;
let isWin = false;
let winSeq = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startResetGame() {
    document.getElementById("reset").classList.remove("active")
    isWin = false;
    turnCounter = 0;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        boxes[i].addEventListener("click", userTurn, { once: true })
    }
    turn = (Math.floor(Math.random() * 2) == 1) ? "x" : "o";
    winnerSpan.innerHTML = `Turn ${turn}`;
}

startResetGame();

function userTurn() {
    this.innerText = turn;
    turnCounter++;
    checkWin();
    if (!isWin) {
        if (turnCounter == 9) {
            winnerSpan.innerHTML = "match draw";
            isWin = true;
            document.getElementById("reset").classList.add("active")
        } else {
            changeTurn();
        }
    } else {
        [...boxes].forEach((ele) => {
            ele.removeEventListener("click", userTurn)
        })
    }
}

function checkWin() {
    for (let i = 0; i <= 7; i++) {
        if (boxes[winSeq[i][0]].innerText == boxes[winSeq[i][1]].innerText &&
            boxes[winSeq[i][1]].innerText == boxes[winSeq[i][2]].innerText &&
            boxes[winSeq[i][0]].innerText != "" &&
            boxes[winSeq[i][1]].innerText != "" &&
            boxes[winSeq[i][2]].innerText != "") {
            winnerSpan.innerHTML = `<b>${turn}</b> won this game`
            document.getElementById("reset").classList.add("active")
            isWin = true;
            fireConfetti()
            break;
        }
    }

}

function changeTurn() {
    turn = (turn == "x") ? "o" : "x";
    winnerSpan.innerHTML = `Turn ${turn}`;
}

const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        })
    );
}

function fireConfetti() {
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}