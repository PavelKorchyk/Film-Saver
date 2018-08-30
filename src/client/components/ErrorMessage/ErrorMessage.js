import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  shouldDisplayError(condition, error) {
    if (condition) {
      return error;
    } else {
      return null;
    }
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.error}>
        {this.shouldDisplayError(this.props.condition, this.props.error)}
      </div>
    )
  }
}

export default withStyles(styles)(ErrorMessage);
