import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ChartApp from './components/Chart.jsx';
import ChatApp from './components/ChatApp.jsx';
import GameApp from './components/GameApp.jsx';
import './styles.css';

export default () => {
  return (
    <div>
      <Router>
        <div style={{ marginBottom: '20px' }}>
          <Link style={{ marginRight: '10px' }} to="/chart">Chart App</Link>
          <Link style={{ marginRight: '10px' }} to="/chat">Chat App</Link>
          <Link to="/game">Tic-Tac-Toe App</Link>
        </div>
        <Switch>
          <Route path="/chart" component={ChartApp} />
          <Route path="/chat" component={ChatApp} />
          <Route path="/game" component={GameApp} />
        </Switch>
      </Router>
    </div>
  )
}