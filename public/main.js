const BLUE_CLASS = "blue"
const RED_CLASS = "red"
let blueTurn
const subHeader = document.querySelector("h2")
const boxes = document.querySelectorAll(".box")
const board = $(".game-board")[0]
const blueScore = $("#blueScore").parent()
const redScore = $("#redScore").parent()
const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function start() {
    blueScore.addClass("activePlayer")
    blueTurn = false
    boxes.forEach( function(box) {
    box.addEventListener('click', handleClick, { once: true })
})
}

function reset(){
    blueScore.removeClass("activePlayer")
    redScore.removeClass("activePlayer")
    boxes.forEach( i => {
        i.children[0].classList.add('hidden')
        i.classList.remove('blue')
        i.classList.remove('red')
     })
     subHeader.innerText = "Get 3 in a row to win!"
}

function handleClick(e) {
    console.log(`clicked`)
    const box = e.target
    console.log(box)
    const currentClass = blueTurn ? RED_CLASS : BLUE_CLASS
    placeBanana(box, currentClass)
    
    if(checkWin(currentClass)) {
        subHeader.innerText = `${currentClass.toUpperCase()} wins!`
        currentClass = null
    }
    
    if (checkDraw(currentClass)) {
        subHeader.innerText = "It's a draw!"
    }
    switchTurns()
}

function placeBanana(box, currentClass) {
    box.children[0].classList.remove('hidden')
    box.classList.add(currentClass)
}

const activePlayer = "border: 1px solid yellow"

function switchTurns() {
    if (blueTurn == true) {
        blueTurn = false
        redScore.removeClass("activePlayer")
        blueScore.addClass("activePlayer")
    } else {
        blueTurn = true
        blueScore.removeClass("activePlayer")
        redScore.addClass("activePlayer")
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combo => { 
        return combo.every(index => {
            return boxes[index].classList.contains(currentClass) 
        })
    })
}

function checkDraw() {
        return [...boxes].every(x => {
          return x.classList.contains(BLUE_CLASS) || x.classList.contains(RED_CLASS)
        })
}