import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import BottomBar from './components/BottomBar'
import MessagesContainer from './components/MessagesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesContainer />
        <BottomBar />
      </div>
    );
  }
}

export default App;

