import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { white } from 'material-ui/styles/colors';
import io from 'socket.io-client';

const styles = theme => ({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: '56px',
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
      value: [{ name: 'Ricardo', text: 'sandljknlsadsadna' }],
      classes
    };
    this.socket = io.connect(process.env.SOCKET_URL);
    this.socket.on('message', this.messageHandler);
  }

  // generate = (element) => {
  //   return [0, 1, 2].map(value =>
  //     React.cloneElement(element, {
  //       key: value,
  //     }),
  //   );
  // }

  messageHandler = (msg) => {
    const value = [msg].concat(this.state.value)
    this.setState({value})
  }

  render() {
    const { classes, value } = this.state;
    const dense = false;
    const secondary = true;
    console.log(value)
    return (
      <div id='message-container' className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                {this.state.value.map((msg) => <ListItem>
                    <ListItemText
                      primary={msg.name || 'Anonymous'}
                      secondary={msg.text}
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