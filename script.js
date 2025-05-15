const h2=document.querySelector("h2")
function gameboard(){
    let board=[]
    for (let index = 0; index < 9; index++) {
            board.push(cell())
    }
    const getBoard =() =>board
    const dropToken=(index,player)=>{
        if (board[index].getValue() !== "") {
            return; 
        }
        board[index].addToken(player); 
        
    }
    const printConsole=()=>board.map((cell,index)=>{
        console.log(index,cell.getValue());
    })
    const resetBoard=()=>board.map((cell)=>{
        cell.resetValue()
    })
    return{getBoard,dropToken,printConsole,resetBoard}
}


function cell(){
    let value="";
    const addToken=(player)=>{
        value= player
    }
    const getValue=()=> value
    const resetValue=()=>value=""
    return{addToken,getValue,resetValue}
}



function gameController (
    playerOne,
    playerTwo
){
    
    const board=gameboard()
    let gameOver=false
    const switchGameOver=()=> gameOver= !gameOver
    let round=1
    const players=[
        {name:playerOne,token:"X"},{name:playerTwo,token:"O"}
    ]
    let activePlayer=players[0]

    const getActivePlayer=()=> activePlayer;
    const switchActivePlayer=()=>{ 
     activePlayer= activePlayer==players[0]? players[1]: players[0] 
}
const resetGame=()=>{
    gameOver=false
    round=1
    board.resetBoard()
    h2.textContent=""
    console.log(board.getBoard());
    
}
    const checkWinner=(thisBoard,thisActivePlayerToken)=>{
        if(thisBoard[0].getValue()==thisActivePlayerToken &&thisBoard[1].getValue()==thisActivePlayerToken &&thisBoard[2].getValue()==thisActivePlayerToken ||
            thisBoard[3].getValue()==thisActivePlayerToken &&thisBoard[4].getValue()==thisActivePlayerToken &&thisBoard[5].getValue()==thisActivePlayerToken ||
            thisBoard[6].getValue()==thisActivePlayerToken &&thisBoard[7].getValue()==thisActivePlayerToken &&thisBoard[8].getValue()==thisActivePlayerToken ||
    
            thisBoard[0].getValue()==thisActivePlayerToken &&thisBoard[3].getValue()==thisActivePlayerToken &&thisBoard[6].getValue()==thisActivePlayerToken ||
            thisBoard[1].getValue()==thisActivePlayerToken &&thisBoard[4].getValue()==thisActivePlayerToken &&thisBoard[7].getValue()==thisActivePlayerToken ||
            thisBoard[2].getValue()==thisActivePlayerToken &&thisBoard[5].getValue()==thisActivePlayerToken &&thisBoard[8].getValue()==thisActivePlayerToken ||
    
            thisBoard[0].getValue()==thisActivePlayerToken &&thisBoard[4].getValue()==thisActivePlayerToken &&thisBoard[8].getValue()==thisActivePlayerToken ||
            thisBoard[2].getValue()==thisActivePlayerToken &&thisBoard[4].getValue()==thisActivePlayerToken &&thisBoard[6].getValue()==thisActivePlayerToken 
        ){
            
            console.log(`${getActivePlayer().name} won`);
            h2.textContent=`${getActivePlayer().name} won`
            switchGameOver()
        }
        
    }
    const checkDraw=()=>{
        if(round>9){
            switchGameOver()
            console.log("Draw")
            h2.textContent="Draw"
            
        }
    }
    const printNewRound =()=>{
        board.printConsole()
        if(gameOver==true) return
    }
    const playRound=(index)=>{
        if(gameOver==true) return
        round+=1
        let thisActivePlayerToken=getActivePlayer().token
        board.dropToken(index,thisActivePlayerToken)
        let thisBoard= board.getBoard()
        checkDraw()
        checkWinner(thisBoard,thisActivePlayerToken)
        if(gameOver==true) return
        switchActivePlayer()
        printNewRound()
    }
    return {playRound,getBoard: board.getBoard, getActivePlayer,resetGame}
}


function displayController(name1,name2){
    const game=gameController(name1,name2)
    const boardContainer=document.querySelector(".board-container")
    
    const updateScreen=()=>{
        //board container
        boardContainer.innerHTML=""
        
        game.getBoard().map((cell,index)=>{
            let button=document.createElement("button")
            button.classList.toggle("button-board")
            button.textContent=cell.getValue()
            
            button.addEventListener("click",()=>{
                if(button.textContent!="") return
                game.playRound(index)
                updateScreen()
            })
            boardContainer.appendChild(button)
        })
    }   
    return {updateScreen, resetGame:game.resetGame}
}
const gettingEvents=()=>{
    
    const firstPlayer=document.getElementById("first-player-name")
    const secondPlayer=document.getElementById("second-player-name")
    const userNameButton=document.getElementById("user-input-btn")
    
    let displayControllerInstance;
    userNameButton.addEventListener("click",()=>{
        let name1=firstPlayer.value.trim()
        let name2=secondPlayer.value.trim()
        if(name1 =="" || name2=="") {
            h2.textContent="Fill in name"
            return}
        displayControllerInstance=displayController(name1,name2)
        displayControllerInstance.updateScreen()
        
        firstPlayer.disabled=true;
        secondPlayer.disabled=true
        userNameButton.disabled=true
        
    })
    
    
    const restartButton=document.querySelector("#restart-button")
    
    restartButton.addEventListener("click",()=>{
        displayControllerInstance.resetGame()
        displayControllerInstance.updateScreen()
    })
    
}
gettingEvents()