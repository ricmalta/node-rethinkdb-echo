import React, { Component } from 'react';
import './App.css';
import BottomBar from './components/BottomBar'
import MessagesContainer from './components/MessagesContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: 'public',
    };
  }
  onChangeChannel = (channel) => {
    this.setState({ channel })
  }
  render() {
    const { channel } = this.state;
    return (
      <div key='container' className="App">
        <MessagesContainer Channel={channel} />
        <BottomBar onChangeChannel={this.onChangeChannel}/>
      </div>
    );
  }
}

export default App;

