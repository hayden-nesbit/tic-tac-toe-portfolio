import React, { Component } from 'react'
import './App.css'



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
    };
    this.handleChange = this.handleChange.bind(this)
    this.setPlayer2 = this.setPlayer2.bind(this)
  }

  handleChange(e) {
    console.log(e)
    this.setState({
      player1: e.target.value
    })
  }

  setPlayer2(player2) {
    this.setState({
      player2: player2
    })
  }

  render() {
    return (
      <div className="container mt-4 text-center">
        <div className="row">
          <div className="col-md-4 mt-5">
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Player 1 name" aria-label="Player 1 name" />
              <button onChange={(e) => this.handleChange(e.target.value)} value={this.state.player1} className="btn btn-outline-primary my-2 my-sm-0 " type="submit">Submit</button>
            </form> */}
            <br />
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Player 2 name" aria-label="Player 1 name" />
              <button onChange={(e) => this.setPlayer2(e.target.value)} className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
            </form> */}
          </div>
          <div className="col-md-4">

            <Board />
          </div>
          <div className="game-info">
          </div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      count: 0,
      xWins: 0,
      oWins: 0,
    };
    this.resetGame = this.resetGame.bind(this)
  }

  // componentDidMount() {
  //   if (window.localStorage.xWins || window.localStorage.oWins) {
  //     let oWins = localStorage.getItem('oWins')
  //     let xWins = localStorage.getItem('xWins')
  //     console.log(xWins)
  //     this.setState({
  //       xWins: xWins,
  //       oWins: oWins,
  //     })
  //   }
  // }

  handleClick(i) {

    let newCount = this.state.count + 1;

    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      count: newCount
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      xWins: 0,
      oWins: 0,
      count: 0
    })
  }

  handleWin(win) {
  
  }


  render() {
    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = 'GAME OVER: ' + winner + ' wins!';
    } else if (!winner && this.state.count >= 9) {
      status = "GAME OVER: It's a draw!"
    } else {
      status = "It's " + (this.state.xIsNext ? 'X' : 'O') + "'s turn";
    }

    return (
      <div className="container">
        <h1 className="text-center ml-4 text-dark">Tic-Tac-Toe</h1>
        <h5 className="text-center mb-3 ml-4 text-dark">{status}</h5>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="row">
          <div id="grid" className="col mt-3">
            <h5>X's wins: </h5><h4>{this.state.xWins}</h4>
          </div>
          <div id="grid" className="col">
            <button onClick={() => this.resetGame()} type="button" className="btn btn-danger btn-sm mt-3 text-center">Reset</button>
          </div>
          <div id="grid" className="col mt-3">
            <h5>O's wins: </h5><h4>{this.state.oWins}</h4>
          </div>
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <div id="grid" className="col border bg-secondary" onClick={props.onClick}>
      <h5 className="text-center text-light pt-5">{props.value} </h5>
    </div>
  );
}

///////////

function calculateWinner(squares) {
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

export default Game;

