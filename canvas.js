const ticTacToeAiEngine = require('tic-tac-toe-ai-engine');


window.addEventListener("load", (gameState) => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");
    let isItMyTurn = true;
    gameState = ["", "", "", "", "", "", "", "", ""];



    ticTacToeAiEngine.computeMove(gameState);

    const clickableMapSide = window.innerHeight * 0.7 - 150;
    canvas.height = clickableMapSide;
    canvas.width = clickableMapSide;
    ctx.strokeStyle = '#0DA192';
    ctx.lineWidth = 15;
    drawHorizontalLine();
    drawVerticalLine();

    function drawHorizontalLine() {
        ctx.beginPath();
        ctx.moveTo(clickableMapSide / 3, 20);
        ctx.lineTo(clickableMapSide / 3, clickableMapSide - 20);
        ctx.moveTo(clickableMapSide / 3 * 2, 20);
        ctx.lineTo(clickableMapSide / 3 * 2, clickableMapSide - 20);
        ctx.closePath();
        ctx.stroke();
    }

    function drawVerticalLine() {
        ctx.beginPath();
        ctx.moveTo(20, clickableMapSide / 3);
        ctx.lineTo(clickableMapSide - 20, clickableMapSide / 3);
        ctx.moveTo(20, clickableMapSide / 3 * 2);
        ctx.lineTo(clickableMapSide - 20, clickableMapSide / 3 * 2);
        ctx.closePath();
        ctx.stroke();
    }

    function drawX(clickIndex, x, y) {
        ctx.strokeStyle = '#545454';
        ctx.beginPath();
        ctx.moveTo(x + clickableMapSide / 17.575, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 3.7217);
        ctx.moveTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 17.575, y + clickableMapSide / 3.7217);
        ctx.stroke();
        ctx.closePath();
        gameState[clickIndex] = 'X';
        if (toogler.checked) {
            isItMyTurn = true;
        } else {
            isItMyTurn = false;
        }
    }

    function drawO(clickIndex, x, y) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + clickableMapSide / 6, y + clickableMapSide / 6, clickableMapSide / 10, 0, 2 * Math.PI);
        ctx.stroke();
        gameState[clickIndex] = 'O';
        if (!toogler.checked) {
            isItMyTurn = true;
        } else {
            isItMyTurn = false;
        }
    }

    function transformIndexToCoordinate(clickIndex) {
        switch (clickIndex) {
            case (0):
                return [0, 0];
            case (1):
                return [clickableMapSide / 3, 0];
            case (2):
                return [clickableMapSide / 3 * 2, 0];
            case (3):
                return [0, clickableMapSide / 3];
            case (4):
                return [clickableMapSide / 3, clickableMapSide / 3];
            case (5):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3];
            case (6):
                return [0, clickableMapSide / 3 * 2];
            case (7):
                return [clickableMapSide / 3, clickableMapSide / 3 * 2];
            case (8):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3 * 2];
        }
    }

    function clickHandler(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        switch (true) {
            case (x > 0 && x < clickableMapSide / 3 && y > 0 && y < clickableMapSide / 3):
                return 0;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > 0 && y < clickableMapSide / 3):
                return 1;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > 0 && y < clickableMapSide / 3):
                return 2;
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 3;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 4;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 5;
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 6;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 7;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 8;
        }
    }

    function finishGame(nexMoove) {
        console.log(nexMoove.depth, nexMoove.winner);
        if (nexMoove.winner && nexMoove.depth < 2) {
            canvas.removeEventListener('click', gameStarter);
            if (nexMoove.winnder === 'X' && toogler.checked === false) {
                document.getElementById("result").innerText = "winner";
            } else if (nexMoove.winnder === 'O' && toogler.checked === true) {
                document.getElementById("result").innerText = "winner";
            } else {
                document.getElementById("result").innerText = "looser";
            }
        }
    }

    function trigerCPUMoove() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let nexMoove = cpuMoove();
                resolve(nexMoove);
                reject((err) => {
                    return err;
                });
            }, 1000);
        })
    }

    function playerMoove(clickIndex) {

        return new Promise((resolve, reject) => {

            if (gameState[clickIndex] === '') {
                let coordinates = transformIndexToCoordinate(clickIndex);
                if (toogler.checked === false) {
                    drawX(clickIndex, ...coordinates);
                } else {
                    drawO(clickIndex, ...coordinates);
                }
            }

            resolve();
            reject((err) => {
                return err;
            });
        })

    }

    function cpuMoove() {

        let nexMoove = ticTacToeAiEngine.computeMove(gameState);


        console.log(nexMoove);

        if (nexMoove.depth === 0) {
            return nexMoove;
        }

        let indexOfNewMoove;
        for (let i = 0; i < 9; i++) {
            if (gameState[i] !== nexMoove.nextBestGameState[i]) {
                indexOfNewMoove = i;
            }
        }

        let coordinates = transformIndexToCoordinate(indexOfNewMoove);

        if (toogler.checked === true) {
            drawX(indexOfNewMoove, ...coordinates);
        } else {
            drawO(indexOfNewMoove, ...coordinates);
        }
        return nexMoove;
    }

    async function gameFlow(canvas, event) {
        if (isItMyTurn) {
            let clickIndex = clickHandler(canvas, event);
            playerMoove(clickIndex);
            let nexMoove = await trigerCPUMoove();
            await finishGame(nexMoove);
        }
    }


    const toogler = document.querySelector('#switch');
    const symbolX = document.querySelector('#symbol-X');
    const symbolO = document.querySelector('#symbol-O');
    const instruct = document.querySelector('#instruct');

    const changeHandler = e => {
        symbolO.classList.toggle('selected');
        symbolX.classList.toggle('selected');
        toogler.removeEventListener('change', changeHandler);
        toogler.disabled = true;
        instruct.innerText = '';
        gameFlow(canvas, e);
    }

    const gameStarter = e => {
        toogler.removeEventListener('change', changeHandler);
        toogler.disabled = true;
        instruct.innerText = '';
        gameFlow(canvas, e);
    }

    canvas.addEventListener('click', gameStarter);
    toogler.addEventListener('change', changeHandler);


});