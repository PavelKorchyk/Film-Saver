import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
class NotFound extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <img src={require("../../../../public/404.png")} alt="" className={classes.notFound} />
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
