import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    );
  }
}

class Box extends Component {
  render() {
    return (
      <button onClick={() => this.props.clickedbutton(this.props.row, this.props.id)} type="button" className="Box">{this.props.symbol}</button>
    )
  }
}

class Row extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Box id={0} key={0} row={this.props.row} clickedbutton={this.props.clickedButton} symbol={this.props.rowData[0]} />
        <Box id={1} key={1} row={this.props.row} clickedbutton={this.props.clickedButton} symbol={this.props.rowData[1]} />
        <Box id={2} key={2} row={this.props.row} clickedbutton={this.props.clickedButton} symbol={this.props.rowData[2]} />
      </div>
    );
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      row1: ["-", "-", "-"],
      row2: ["-", "-", "-"],
      row3: ["-", "-", "-"]

    }
    this.clickedButton = this.clickedButton.bind(this);
  }

  clickedButton(row, id) {
    let newArr = this.state[row].slice(0);
    newArr[id] = newArr[id] === 'X' ? 'O' : 'X';
    this.setState({
      [`${row}`]: newArr
    })
  }

  componentDidUpdate() {
    for (let row = 1; row <= 3; row++) {
      if ((this.state[`row${row}`][0] === 'O' || this.state[`row${row}`][0] === 'X') && (this.state[`row${row}`][0] === this.state[`row${row}`][1] && this.state[`row${row}`][2] === this.state[`row${row}`][0])) {
        console.log('Winning condition');
      }
    }

    for (let index = 0; index <= 2; index++) {
      if ((this.state['row1'][index] === 'O' || this.state['row1'][index] === 'X') && (this.state['row1'][index] === this.state['row2'][index] && this.state['row3'][index] === this.state['row1'][index])) {
        console.log('Winning condition');
      }
    }

    // Diagonol Condition
    // [X, -, -] row1, index0
    // [-, X, -] row2, index1
    // [-, -, X] row3, index2
    if ((this.state['row1'][0] === 'O' || this.state['row1'][0] === 'X')
      && (this.state['row1'][0] === this.state['row2'][1] && this.state['row1'][0] === this.state['row3'][2])) {
      console.log('Winning condition (diagonal)');
    }
    // [-, -, X] row1, index2
    // [-, X, -] row2, index1
    // [X, -, -] row3, index0
    if ((this.state['row1'][2] === 'O' || this.state['row1'][2] === 'X')
      && (this.state['row1'][2] === this.state['row2'][1] && this.state['row1'][2] === this.state['row3'][0])) {
      console.log('Winning condition (diagonal)');
    }


  }

  render() {
    return (
      <div>
        <Row rowData={this.state.row1} clickedButton={this.clickedButton} row={"row1"} />
        <Row rowData={this.state.row2} clickedButton={this.clickedButton} row={"row2"} />
        <Row rowData={this.state.row3} clickedButton={this.clickedButton} row={"row3"} />
      </div>

    );
  }
}