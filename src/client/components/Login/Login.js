import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeRequest from '../../makeRequest';
import history from '../../history';

if (localStorage.getItem('token')) {
  history.replace('/');
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signInButtonColor: "primary",
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = () => {
    const url = '/api/auth/login';
    const method = 'POST';
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    makeRequest (url, method, data)
    .then(response => {
      if(response.token != undefined) {
        localStorage.setItem('token', response.token);
        console.log('Token:', localStorage.getItem('token'));
        history.replace('/');
      } else {
        this.setState({ signInButtonColor: "secondary" });
      }
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>Log in</header>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
            value={this.state.email}
            onChange={this.onChange}
          />
          <TextField
            id="password-input"
            name="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={this.state.password}
            onChange={this.onChange}
          />
          <Button onClick={this.onSubmit} type="submit" variant="outlined" color={this.state.signInButtonColor} className={classes.button}>
            Login
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/signup'>
            SignUp
          </Button>
        </Paper>
      </div>
    )
  }
} 

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
