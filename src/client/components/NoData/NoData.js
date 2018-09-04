import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class NoData extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <img src={require("../../../../public/nodata.png")} alt="" className={classes.notFound} />
      </div>
    )
  }
}

export default withStyles(styles)(NoData);
