import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Edit from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { white } from 'material-ui/styles/colors';
import { xhr } from '../net';

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
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
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
      nickname: '',
      channel: 'public',
      classes,
      username: props.username,
      open: false
    };
  }
  
  send = async () => {
    const message = this.state.value;
    const obj = { Author: this.state.nickname, Room: this.state.channel, Text: message };
    if (this.props.onSend) {
      this.props.onSend(this.state.value);
      this.setState({ value: '' });
      return;
    }

    const res = await xhr({ method: 'POST', data: obj })
  }

  toggleConfig = (val) => {
    console.log(val)
    this.setState({ open: !this.state.open })
  }

  onChange = (evt) => {
    console.log('onChange', { [evt.target.name]: evt.target.value })
    this.setState({ [evt.target.name]: evt.target.value });
  }

  componentWillMount = () => {
    if (!this.state.nickname) {
      this.setState({ open:true })
    }
  }

  render() {
    const { classes, value, nickname, channel } = this.state;
   
    return (
      <div className={classes.container}>
        <Button 
          className={classes.button} 
          variant="fab" 
          color="default"
          onClick={this.toggleConfig}>
          <Edit />
        </Button>
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Configurations</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="nickname"
              name="nickname"
              label="Nickname"
              type="text"
              fullWidth
              value={this.state.nickname}
              onChange={this.onChange}
            />
           
            <TextField
              margin="dense"
              id="channel"
              name="channel"
              label="Channel"
              type="text"
              fullWidth
              value={this.state.channel}
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfig} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
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