import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { logOut, addSearchValue, removeSearchValue, searchOn, searchOff } from '../../redux/actions/index';
import { connect } from "react-redux";
import history from '../../services/history';

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    searchOn: () => dispatch(searchOn()),
    searchOff: () => dispatch(searchOff()),
    addSearchValue: (searchValue) => dispatch(addSearchValue(searchValue)),
    removeSearchValue: () => dispatch(removeSearchValue()),
  };
};

const mapStateToProps = store => {
  return {
    token: store.user.token,
    searchValue: store.user.searchValue,
  };
};

class NavBar extends Component {
  logOut = () => {
    this.props.logOut();
  }

  onTextChange = (e) => {
    e.persist();
    setTimeout(() => {
      this.props.addSearchValue(e.target.value)    
      if (e.key === "Enter") {
        this.search();
      }
    }, 800)
  }

  search = () => {
    this.props.searchOn();
    history.push({
      pathname: '/',
    })
  }

  toHomePage = () => {
    this.props.searchOff();
    this.props.removeSearchValue();
    history.push({
      pathname: '/',
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" className={classes.flex} onClick={this.toHomePage} >
              <Typography variant="title" color="inherit" >
                Films Saver
              </Typography>
            </Button>
            <TextField
              id="searchValue"
              onChange={this.onTextChange}
              onKeyPress={this.onTextChange}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                },
              }}
            />
            <Button color="inherit" onClick={this.props.toggleSearch}>
              <Search />
            </Button>
            <Button color="inherit" onClick={this.toHomePage} >Films</Button>
            <Button color="inherit"  component={Link} to='/genres'>Genres</Button>
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