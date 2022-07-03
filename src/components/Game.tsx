import React from "react";
import Board from "./Board";
import "./Game.css";
import { XIsNextContext } from "./XIsNextContext";

function calculateWinner(squares: string[]) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type GameProps = {};
type GameState = {
  history: {
    squares: string[],
  }[]
  xIsNext: boolean,
  stepNumber: number,
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props:GameProps) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(i:number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      history: history.concat({squares}),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const gameOver = this.state.stepNumber === 9;

    let status;
    if (winner) {
      status = winner + ' won';
    } else if (gameOver) {
      status = 'Game over';
    } else {
      status = 'Next player is ' + (this.state.xIsNext ? 'X' : '0');
    }

    const steps = history.map((_, step) => {
      const desc = step ?
        `Go to step #${step}` :
        `Go to game start`;

      return (
        <li key={step} className="game__steps-step">
          <button onClick={() => this.jumpTo(step)}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <h1 className="game__title">Tic Tac Toe</h1>
        <div className="game__status">
          {status}
        </div>

        <div className="game__board">
          <XIsNextContext.Provider value={this.state.xIsNext}>
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
          </XIsNextContext.Provider>
        </div>
        <div className="game__history">
          <h2>History</h2>
          <ul className="game__steps">{steps}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
