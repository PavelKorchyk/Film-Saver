import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from '../../validate';
import makeRequest from '../../makeRequest';
import history from '../../history';
import { connect } from "react-redux";

const mapStateToProps = store => {
  return {token: store.user.token};
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      userName: '',
      password: '',
      passwordConfirmation: '',
      errors: 'no errors',
      numOfSignUpAttempts: 0,
    };
  }

  componentDidMount() {
    if (this.props.token) {
      history.replace('/');
    }
  }

  onFieldChange = (e) => {
    this.setState({[e.target.id]: e.target.value}, () => {
      let errors = {
        password: this.state.password,
        email: this.state.email,
        userName: this.state.userName,
        passwordConfirmation: this.state.passwordConfirmation,
      }
      this.setState({ errors: validate(errors) });
    });
  }

  handleSubmit = () => {
    this.setState({ numOfSignUpAttempts: this.state.numOfSignUpAttempts + 1 })
    if (Object.keys(this.state.errors).length === 0) {
      const url = 'api/user/signup';
      const method = 'POST';
      const data = {
        email: this.state.email,
        username: this.state.userName,
        password: this.state.password,
      };
      makeRequest(url, method, data)
      .then(response => {
        history.replace('/login')
      })
      .catch(error => console.error('Error:', error));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>SignUp</header>
          <TextField
            id="email"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.email}
          />
          <div className={classes.error}>{this.state.numOfSignUpAttempts > 0 ? this.state.errors.email : null}</div>
          <TextField
            id="userName"
            label="User Name"
            placeholder="user_1"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.userName}
          />
          <div className={classes.error}>{this.state.numOfSignUpAttempts > 0 ? this.state.errors.userName : null}</div>
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.password}
          />
          <div className={classes.error}>{this.state.numOfSignUpAttempts > 0 ? this.state.errors.password : null}</div>
          <TextField
            id="passwordConfirmation"
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.passwordConfirmation}
          />
          <div className={classes.error}>{this.state.numOfSignUpAttempts > 0 ? this.state.errors.passwordConfirmation : null}</div>
          <Button onClick={this.handleSubmit} variant="outlined" color="primary" className={classes.button}>
            SignUp
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/login'>
            Login
          </Button>
        </Paper>
      </form>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, null) (withStyles(styles)(Login));