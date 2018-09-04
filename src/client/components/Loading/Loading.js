import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <img src={'https://upload.wikimedia.org/wikipedia/commons/6/63/Elipsis.gif'} alt="" className={classes.elipsis} />
    </div>
  )
}

export default withStyles(styles) (Loading);