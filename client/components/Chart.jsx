import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      ws: new WebSocket('ws://localhost:6969'),
      data: [0, 0, 0, 0],
      flowing: false
    };
    this.handleAutomatic = this.handleAutomatic.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleAutomatic(e) {
    e.preventDefault();
    this.state.ws.send(JSON.stringify({ event: "automatic", data: this.state.data }))
    this.setState({
      flowing: true
    })
  }

  handleIncrement(e) {
    e.preventDefault();
    this.state.ws.send(JSON.stringify({ event: "increment", data: this.state.data }))
  }

  handleMessage(newData) {
    newData = JSON.parse(newData);
    let myData = this.state.data.slice();
    for (let i = 0; i < 4; i++) {
      newData[i] += myData[i];
    }
    this.setState({
      data: newData
    })
  }

  handleStop(e) {
    e.preventDefault();
    this.state.ws.send(JSON.stringify({ event: "stop" }));
    this.setState({
      flowing: false
    })
  }

  render() {
    this.state.ws.onopen = () => {
      console.log('Connection opened!')
    }
    this.state.ws.onmessage = (message) => {
      this.handleMessage(message.data);
    }
    this.state.ws.onclose = () => {
      console.log('Closing connection!')
      this.setState({
        ws: null
      })
    }

    const data = {
      labels: ['Test'],
      datasets: [{
        barPercentage: 0.8,
        data: [this.state.data[0]],
        backgroundColor: 'red',
        label: 'Chance',
      },
      {
        barPercentage: 0.8,
        data: [this.state.data[1]],
        backgroundColor: 'yellow',
        label: 'Colin',
      },
      {
        barPercentage: 0.8,
        data: [this.state.data[2]],
        backgroundColor: 'blue',
        label: 'Chris',
      },
      {
        barPercentage: 0.8,
        data: [this.state.data[3]],
        backgroundColor: 'green',
        label: 'Will',
      }]
    };

    var options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            max: 100
          }
        }]
      }
    };

    let myButton = !this.state.flowing ? <button onClick={this.handleAutomatic}>Automatic</button> : <button onClick={this.handleStop}>Stop</button>

    return (
      <div>
        <div>
          <button style={{ marginRight: '10px' }} onClick={this.handleIncrement}>Increment</button>
          {myButton}
        </div>
        <div>
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}