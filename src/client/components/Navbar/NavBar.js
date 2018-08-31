import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logOut } from '../../redux/actions/index';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

const mapStateToProps = store => {
  return {token: store.user.token};
};

class NavBar extends Component {
  logOut = () => {
    this.props.logOut();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex} component={Link} to='/'>
              Films Saver
            </Typography>
            <Button color="inherit" component={Link} to='/'>Films</Button>
            <Button color="inherit" component={Link} to='/genres'>Genres</Button>
            { this.props.token ? (<Button color="inherit" onClick={this.logOut}>Logout</Button>) : (<Button color="inherit" component={Link} to='/login'>Login</Button>) }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
  
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, mapDispatchToProps) (withStyles(styles)(NavBar));