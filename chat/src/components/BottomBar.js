import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import TextField from 'material-ui/TextField'
import { white } from 'material-ui/styles/colors';

const styles = theme => ({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#f9f9f9'
  },
  textField: {
    flexGrow: 1,
    margin: '0 0 8px 8px',
    backgroundColor: 'white',
    paddingTop: '8px',
    borderRadius: '4px 4px 4px 4px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class BottomBar extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      value: '',
      classes,
      username: props.username
    };
  }
  
  send = () => {
    console.log(this.state.value)
    this.props.onSend && this.props.onSend(this.state.value);
    this.setState({ value: '' })
  }

  render() {
    const { classes, value } = this.state;
    return (
      <div className={classes.container}>
        <TextField
          type="text"
          className={classes.textField} 
          value={value}
          autoFocus={true}
          placeholder="Type your message"
          onChange={(evt) => { 
            this.setState({ value: evt.target.value })
          }}
          onKeyPress={(evt) => {
            evt.key === 'Enter' && this.send()
          }}
          >
        </TextField>
        <Button 
        className={classes.button} 
        variant="raised" 
        color="default"
        onClick={this.send}>Send
          <Send className={classes.rightIcon}>send</Send>
        </Button>
      </div>
    );
  }
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
  onSend: PropTypes.func,
};

export default withStyles(styles)(BottomBar);