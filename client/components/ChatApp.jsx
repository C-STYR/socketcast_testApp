import React, { Component } from 'react';
import io from 'socket.io-client';

export default class ChatApp extends Component {
  constructor() {
    super();
    this.state = {
      ws: new WebSocket('ws://localhost:3000'),
      chatBox: '',
      messages: []
    }
    this.handleAPI = this.handleAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAPI(message) {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      chatBox: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = this.state.chatBox;
    //this.state.socket.emit('FromClient', message)
    this.setState({
      chatBox: "",
      messages: [...this.state.messages, message]
    })
  }

  render() {
    this.state.ws.onopen = () => {
      console.log('Connection opened!')
    }

    this.state.ws.onmessage = (message) => {
      this.handleAPI(message.data);
    }

    const messages = [];
    let count = 1;
    for (const message of this.state.messages) {
      messages.push(<li key={count}>{message}</li>);
      count++;
    }

    return (
      <div>
        <ul id="messages">{messages}</ul>
        <form id="form" onSubmit={this.handleSubmit}>
          <input id="input" autoComplete={"off"} value={this.state.chatBox} onChange={this.handleChange} /><button>Send</button>
        </form>
      </div>

    )
  }
}