import React from 'react'
import GameBoard from './GameBoard'

class App extends React.Component {
  constructor(props) {
    super(props);

    const boxes = Array(9).fill(null).map(() => ({
      value: null,
      className: 'box ',
      isFull: false,
      fromTurn: null
    }))

    this.state = {
      history: [
        {
          boxes: boxes,
        }
      ],
      isRedNext: true,
      turnNumber: 0
    }
  }

  handleClick = (i) => {

    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();

    if (calculateWinner(boxes) || boxes[i].isFull === true) {
      return;
    }

    const next = this.state.isRedNext

    next ? boxes[i] = {value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue'} : boxes[i] = {value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red'}
    
    console.log(boxes[i])

    this.setState({
      history: history.concat([
        {
          boxes: boxes,
        }
      ]),
      isRedNext: !next,
      turnNumber: history.length
    })
  }

  goBack = (move) => {

    console.log('BACK')
    // const history = this.state.history.slice(0, this.state.turnNumber + 1)
    // const moveArray = [move]
    // const lastMove = {
    //   number: moveArray.slice()
    // }

    // const theBox = history[move].boxes.find(el => el.fromTurn === lastMove.number - 1)

    this.setState({
      turnNumber: move,
      isRedNext: (move % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber]
    const winner = calculateWinner(current.boxes);

    const moves = history.map((move, turn) => {
      let desc;
      turn > 0 ? desc = 'undo' + turn : desc = null

      return (
        <div className='undo-btn' key={turn} onClick={() => this.goBack(turn)}>{desc}</div>
      );
    });

    let status;
    if (winner === 'box blue') {
      status = 'Blue wins!';
    } else if (winner === 'box red') {
      status = 'Red wins!';
    } else {
      status = this.state.isRedNext ? 'Blue\'s turn' : 'Red\'s turn';
    }
    return (
      <div>
        <div>tic-tac-bananas</div>
        <div className="instructions">{status}</div>
        <GameBoard
          boxes={current.boxes}
          onClick={i => this.handleClick(i)}
        />
        <div id='undo-container' key='undo-container' className="undo-container">{moves}</div>
      </div>
    )
  }
}

const calculateWinner = (boxes) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a].className !== 'box ' && boxes[a].className === boxes[b].className && boxes[a].className === boxes[c].className) {
      return boxes[a].className;
    }
  }
  return null;
}

export default App
