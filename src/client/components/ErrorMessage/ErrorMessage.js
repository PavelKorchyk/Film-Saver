import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ErrorMessage extends Component {
  shouldDisplayError(condition, error) {
    if (condition) {
      return error;
    } else {
      return null;
    }
  }
  
  render() {
    const { classes, condition, error } = this.props;
    return (
      <div className={classes.error}>
        {this.shouldDisplayError(condition, error)}
      </div>
    );
  }
}

export default withStyles(styles)(ErrorMessage);
