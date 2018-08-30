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
import { logIn } from '../../redux/actions/index'; 
import { connect } from 'react-redux';
import shouldRender from '../../shouldRender';

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
  };
};

const mapStateToProps = (store) => {
  if (store.user.token) {
    history.replace('/');
  }
  return {token: store.user.token};
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signInButtonColor: "primary",
      Error: '',
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: {} });
  }

  onSubmit = () => {
    event.preventDefault();
    const url = '/api/auth/login';
    const method = 'POST';
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    makeRequest (url, method, null, data)
    .then(response => {
      if (response.Error) {
        this.setState({ Error: response.Error });
        throw new Error('Wrong email or password');
      } else {
        return response;
      }
    })
    .then(response => {
      if(response.token) {
        this.props.logIn(response);
        history.replace('/');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      this.setState({ signInButtonColor: "secondary" });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>Log in</header>
          <div className={classes.error}> 
            {
              shouldRender(this.state.Error, this.state.Error)
            }
          </div>
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
         
          <Button onClick={this.onSubmit} variant="outlined" color={this.state.signInButtonColor} className={classes.button}>
            Login
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/signup'>
            SignUp
          </Button>
        </Paper>
      </form>
    )
  }
} 

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, mapDispatchToProps) (withStyles(styles)(Login));
