import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import BottomBar from './components/BottomBar'
import MessagesContainer from './components/MessagesContainer'

class App extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;
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

