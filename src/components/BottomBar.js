import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton'
import Send from 'material-ui-icons/Send';
import Edit from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
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
    if (!message) { return; }
    const obj = { Author: this.state.nickname, Room: this.state.channel, Text: message };
    await xhr({ method: 'POST', data: obj })
    this.setState({ value: '' });
  }

  toggleConfig = (val) => {
    if (!this.state.nickname || !this.state.channel) {
      return;
    }
    this.setState({ open: !this.state.open })
    if (this.props.onChangeChannel && this.state.channel) {
      this.props.onChangeChannel(this.state.channel);
    }
  }

  onChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  componentWillMount = () => {
    if (!this.state.nickname || ! this.state.channel) {
      this.setState({ open:true })
    }
  }

  render() {
    const { classes, value } = this.state;
   
    return (
      <div className={classes.container}>
        <IconButton 
          className={classes.button} 
          variant="fab" 
          color="default"
          size="medium"
          onClick={this.toggleConfig}>
          <Edit />
        </IconButton>
        <TextField
          type="text"
          // multiline
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
        <IconButton 
          className={classes.button} 
          variant="fab"
          size="medium"
          color="default"
          onClick={this.send}>
          <Send />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Configurations</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              required
              error={!this.state.nickname}
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
              required
              error={!this.state.channel}
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