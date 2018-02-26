import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import { white } from 'material-ui/styles/colors';
import io from 'socket.io-client';

const styles = theme => ({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: '67px',
    top: 0,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#eeeeee'
  }
});

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    const { classes, channel } = props;
    this.state = {
      value: [],
      classes
    };
    this.socket = io.connect(process.env.SOCKET_URL || '//localhost:9700');
    this.socket.on('messages', this.messageHandler);
    this.socket.on('connect', ()=> { console.log('CONNECTED!') })
    this.socket.on('disconnect', ()=> { console.log('DISCONNECT!') })
    this.socket.on('event', function(data){ console.log('DATA', data) });
  }

  messageHandler = (msg) => {
    const value = (this.state.value || []).concat(msg)
    this.setState({value})
  }

  render() {
    const { classes, value } = this.state;
    return (
      <div id='message-container' className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={true}>
                {this.state.value.map((msg, i) => <ListItem key={`message.${i}`}>
                    <ListItemText
                      primary={msg.Author || 'Anonymous'}
                      secondary={msg.Text}
                    />
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