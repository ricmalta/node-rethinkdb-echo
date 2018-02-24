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
      value: [],
      classes
    };
  }

  generate = (element) => {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  

  render() {
    const { classes, value } = this.state;
    const dense = false;
    const secondary = true;
    return (
      <div id='message-container' className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                {this.generate(
                  <ListItem>
                    <ListItemText
                      primary="{Name}"
                      secondary={secondary ? '{Message}' : null}
                    />
                  </ListItem>,
                )}
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