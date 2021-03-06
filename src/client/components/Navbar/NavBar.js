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
import Sort from '@material-ui/icons/Sort';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ScrollUpButton from "react-scroll-up-button";
import { logOut, addSearchValue, removeSearchValue, changeSearchConditions, loading } from '../../redux/actions/index';
import { connect } from "react-redux";
import history from '../../services/history';

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    addSearchValue: (searchValue) => dispatch(addSearchValue(searchValue)),
    removeSearchValue: () => dispatch(removeSearchValue()),
    changeSearchConditions: (sortType, sortValue) => dispatch(changeSearchConditions(sortType, sortValue)),
    loading: () => dispatch(loading()),
  };
};

const mapStateToProps = store => {
  return {
    token: store.user.token,
    searchValue: store.user.searchValue,
    userName: store.user.username,
    isLoadingDone: store.user.isLoadingDone,
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSortOpen: false,
      anchorEl: null,
      searchValue: '',
    };
  }

  logOut = () => {
    this.props.logOut();
  }

  clearSearchValue = () => {
    this.setState({ searchValue: '' });
    this.props.removeSearchValue();
    this.props.loading();
    this.sortBy("$natural", "1");
  }

  //SEARCH
  onTextChange = (e) => {
    this.setState({ searchValue: e.target.value });   
    if (e.key === "Enter") {
      this.search();
    }
  }

  search = () => {
    this.props.addSearchValue(this.state.searchValue);
    this.props.loading();
    history.push({
      pathname: '/',
    });
  }

  //SORT
  handleClick = (event) => {
    event.persist();
    event.preventDefault();
    this.setState(state => ({
      isSortOpen: !state.isSortOpen,
      anchorEl: event.target
    }));
  }

  handleClickAway = () => {
    this.setState({
      isSortOpen: false,
    });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  sortBy = (type, value) => {
    this.props.changeSearchConditions(type, value);
    this.props.loading();
    this.handleClose();
  }

  render() {
    const { classes, userName, toggleSearch, token } = this.props;
    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <AppBar position="sticky" className={classes.havBar} >
            <Toolbar>
              <Button color="inherit" className={classes.titleButton} onClick={this.clearSearchValue} component={Link} to='/'>
                <Typography variant="title" color="inherit" >
                  Films Saver
                </Typography>
              </Button>
              <div>{userName ? `for ${userName}`: null}</div>
              <div className={classes.flex}></div>
              <React.Fragment>
                <Button 
                  color="inherit" 
                  aria-owns={this.state.isSortOpen ? 'sort-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <Sort />
                </Button>
                  <Menu id="sort-menu" open={this.state.isSortOpen} anchorEl={this.state.anchorEl} onClose={this.handleClose}>
                    <MenuItem onClick={() => this.sortBy("$natural", "1")}>By default</MenuItem>
                    <MenuItem onClick={() => this.sortBy("$natural", "-1")}>Last Updated</MenuItem>
                    <MenuItem onClick={() => this.sortBy("title", "1")}>Name A-Z</MenuItem>
                    <MenuItem onClick={() => this.sortBy("title", "-1")}>Name Z-A</MenuItem>
                  </Menu>
              </React.Fragment>
              <TextField
                id="searchValue"
                value={this.state.searchValue}
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
              <Button color="inherit" onClick={toggleSearch}>
                <Search />
              </Button>
              <Button color="inherit" onClick={this.clearSearchValue} component={Link} to='/'>Films</Button>
              <Button color="inherit" onClick={this.clearSearchValue}  component={Link} to='/genres'>Genres</Button>
              { token ? (<Button color="inherit" onClick={this.logOut}>Logout</Button>) : (<Button color="inherit" onClick={this.clearSearchValue} component={Link} to='/login'>Login</Button>) }
            </Toolbar>
          </AppBar>
        </ClickAwayListener>
        <ScrollUpButton />
      </div>
    );
  }
}
  
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, mapDispatchToProps) (withStyles(styles)(NavBar));