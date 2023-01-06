var Gameboard=(function () {
    let _gameboard=["","","",
                    "","","",
                    "","",""];
    function addto(player,position) {
        if (player==="x") {
            _gameboard[position]="x";
        } else {
            _gameboard[position]="o";
        }
    }
    function reset() {
        _gameboard=["","","",
                    "","","",
                    "","",""];
    }
    function getboard() {
        let x=_gameboard;
        return x;
    }
    return {addto,reset,getboard};
})()

function player(piece) {
    let _Player=piece;
    function getPlayer() {
        let x=_Player;
        return x;
    }
    return {getPlayer};
}

var game=(function() {
    let board=Gameboard;
    const boardElements=document.querySelectorAll(".element");
    boardElements.forEach(element => {
        element.addEventListener('click',play);
    });
    const restartBtn=document.getElementById("restart");
    restartBtn.addEventListener('click',resetstate);
    let player1=player("x");
    let player2=player("o");
    let playerTurn=player1;
    const state=document.getElementById("state");

    function resetstate() {
        board.reset();
        renderdom();
    }

    function play(e) {
        board.addto(playerTurn.getPlayer(),(e.target.id-1));
        if (playerTurn===player1) {
            playerTurn=player2;
        } else {
            playerTurn=player1;
        }
        renderdom();
    }

    function renderdom() {
        for (let i = 0; i < 9; i++) {
            boardElements[i].innerText=board.getboard()[i];
        }
        let gamestate1=gamestate();
        if (gamestate1==="x") {
            state.innerText="Player X won";
        } else if (gamestate1==="o") {
            state.innerText="Player O won";
        } else if (gamestate1==="pending") {
            state.innerText="Player "+playerTurn.getPlayer()+"'s turn";
        } else if (gamestate1==="draw") {
            state.innerText="You drew!";
        }
    }

    function gamestate() {
        for (let i = 0; i < 3; i++) {
            if ((board.getboard()[i]===board.getboard()[i+3])&&(board.getboard()[i]===board.getboard()[i+3*2])&&board.getboard()[i]!="") {
                return board.getboard()[i];
            } else if ((board.getboard()[i]===board.getboard()[i+1])&&(board.getboard()[i]===board.getboard()[i+2])&&board.getboard()[i]!="") {
                return board.getboard()[i];
            }
        }
        if ((board.getboard()[0]===board.getboard()[4])&&(board.getboard()[0]===board.getboard()[8])||(board.getboard()[2]===board.getboard()[4])&&(board.getboard()[2]===board.getboard()[6])&&board.getboard()[4]!="") {
            return board.getboard()[4];
        }
        for (let i = 0; i < board.getboard().length; i++) {
            if (board.getboard()[i]==="") {
                return "pending";
            }
        }
        return "draw";
    }
    return {play};
})()
