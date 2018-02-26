import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import TextField from 'material-ui/TextField'
import { white } from 'material-ui/styles/colors';
import io from 'socket.io-client';

const styles = theme => ({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: '63px',
    top: 0,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#eeeeee'
  }
});

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      value: [],
      classes
    };
    this.socket = io.connect(process.env.SOCKET_URL || '//localhost:9700');
    // this.socket.on('connect', this.enter)
    this.socket.on('messages', this.messageHandler);
  }

  enter = (room = '') => {
    this.setState({ value: [] })
    if (room) {
      this.setState({room})
      this.socket.emit('enter', room);
    }
  }

  componentWillReceiveProps = (props) => {
    if (props && props.Channel) {
      this.enter(props.Channel);
    }
  } 

  messageHandler = (msg) => {
    const value = (this.state.value || []).concat(msg);
    this.setState({value});
  }

  render() {
    const { classes } = this.state;
    return (
      <div id='message-container' className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={true}>
                {this.state.value.map((msg, i) => <ListItem key={`message.${i}`}>
                    <ListItemText
                      primary={`${msg.Author}@${this.state.room}` || 'Anonymous'}
                      secondary={msg.Text}
                    />
                  {/* <TextField
                    type="text"
                    multiline
                    disabled
                    // className={classes.textField} 
                    value={msg.Text} /> */}
                  </ListItem>)}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessagesContainer);