import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeRequest from '../../services/makeRequest';
import history from '../../services/history';
import { logIn } from '../../redux/actions/index'; 
import { connect } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { createLoginUrl } from '../../services/createURL';

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
  };
};

const mapStateToProps = (store) => {
  return {token: store.user.token};
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signInButtonColor: "primary",
      errors: '',
    };
  }

  componentDidMount() {
    if (this.props.token) {
      history.replace('/');
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      history.replace('/');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errors: '' });
  }

  onSubmit = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ errors: 'Enter email and password' });
    } else {
      const method = 'POST';
      const data = {
        email: email,
        password: password,
      };
      makeRequest (createLoginUrl(), method, null, data)
      .then(response => {
        if (response.Error) {
          this.setState({ errors: response.Error });
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
      .catch(err => {
        this.setState({ signInButtonColor: "secondary" });
        console.log(err);
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { errors, email, password, signInButtonColor } = this.state;
    return (
      <form className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>Log in</header>
          <ErrorMessage error={errors} condition={errors} />
          <TextField
            id="email-input"
            name="email"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
            value={email}
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
            value={password}
            onChange={this.onChange}
          />
          <Button onClick={this.onSubmit} variant="outlined" color={signInButtonColor} className={classes.button}>
            Login
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/signup'>
            SignUp
          </Button>
        </Paper>
      </form>
    );
  }
} 

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, mapDispatchToProps) (withStyles(styles)(Login));
