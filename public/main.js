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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function start() {
    redScore.addClass("activePlayer")
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
     availableBoxes = []
}

function handleClick(e) {
    const box = e.target
    let currentClass = blueTurn ? BLUE_CLASS : RED_CLASS
    placeBanana(box, currentClass)
    
    if(checkWin(currentClass)) {
        subHeader.innerText = `${currentClass.toUpperCase()} wins!`
        boxes.forEach( function(box) {
        box.removeEventListener('click', handleClick, { once: true })
        })
    }

    if (checkDraw()) {
        subHeader.innerText = "It's a draw!"
        boxes.forEach( function(box) {
        box.removeEventListener('click', handleClick, { once: true })
        })
    }
    
    let nextClass

    if (currentClass === 'blue') {
        nextClass = 'red'
    } else {
        nextClass = 'blue'
    }

    switchTurns()
    
    autoPick(currentClass, nextClass)

}

const filledBoxes = []

function placeBanana(box, currentClass) {
    box.classList.add(currentClass)
    box.children[0].classList.remove('hidden')
    if (!box.classList.contains('hidden')) {
        filledBoxes.push(box)
    }
}

function switchTurns() {
    if (blueTurn == false) {
        blueTurn = true
        redScore.removeClass('activePlayer')
        blueScore.addClass('activePlayer')
    } else {
        blueTurn = false
        redScore.removeClass('activePlayer')
        blueScore.addClass('activePlayer')
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

let availableBoxes = []
let filledBoxIndices = [1]
let playerScore

function autoPick(currentClass, nextClass) {
    
    console.log(availableBoxes)
    // availableBoxes = []

    boxes.forEach( elem => {
        if (elem.children[0].classList.contains('hidden') && !availableBoxes.includes(elem.children[0])){
        availableBoxes.push(elem)
        }
    })

    const randomBox = boxes[Math.floor(Math.random() * availableBoxes.length)]

    playerScore = blueTurn ? redScore : blueScore

    // switchActive(playerScore)

    sleep(600).then(() => {
        randomBox.classList.remove(currentClass)
        randomBox.classList.add(nextClass)
        
        if (!filledBoxes.includes(randomBox)) {
            randomBox.children[0].classList.remove('hidden')
            filledBoxes.push(randomBox)
            if (filledBoxes.length === 0 || filledBoxes.length % 2 === 0) {
                blueScore[0].classList.remove('activePlayer')
                redScore[0].classList.remove('activePlayer')
                redScore[0].classList.add('activePlayer')
            } else {
                blueScore[0].classList.remove('activePlayer')
                redScore[0].classList.remove('activePlayer')
                blueScore[0].classList.add('activePlayer')
            }
        }

        // for (var i in filledBoxIndicies) {
        //     filledBoxIndices.push(i)
        //     console.log(`fBI: ${filledBoxIndices}`)
        // }

        for (var n in filledBoxIndices) {
        availableBoxes.splice(filledBoxIndices[n], 1)
        console.log(`avail boxes after splice: ${availableBoxes}`)
        }

    }).catch(error => console.log(error))

    switchTurns()
}


function switchActive(playerScore) {
    blueScore[0].classList.remove('activePlayer')
    redScore[0].classList.remove('activePlayer')
    playerScore[0].classList.add('activePlayer')
    switchTurns()
}

// function changeActive() {
        
//     if (blueTurn) {
//         redScore[0].classList.remove('activePlayer') 
//         blueScore[0].classList.add('activePlayer')
        
//     } else {
//         blueScore[0].classList.remove('activePlayer') 
//         redScore[0].classList.add('activePlayer')
//     }
    
//     return blueScore,
// }