import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from '../../services/validate';
import makeRequest from '../../services/makeRequest';
import history from '../../services/history';
import { connect } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const mapStateToProps = store => {
  return {token: store.user.token};
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
      numOfSignUpAttempts: 0,
      signUpButtonColor: "primary",
    };
  }

  componentDidUpdate() {
    if (this.props.token) {
      history.replace('/');
    }
  }

  onFieldChange = (e) => {
    const { password, email, username, passwordConfirmation } = this.state;
    this.setState({[e.target.id]: e.target.value}, () => {
      const errors = {
        password: password,
        email: email,
        username: username,
        passwordConfirmation: passwordConfirmation,
      };
      this.setState({ errors: validate(errors) });
    });
  }

  handleSubmit = () => {
    const { email, username, password, passwordConfirmation, numOfSignUpAttempts, errors } = this.state;
    if (!email && !username && !password && !passwordConfirmation) {
      this.setState({ signUpButtonColor: "secondary" });
    } else {
      this.setState({ numOfSignUpAttempts: numOfSignUpAttempts + 1 });
      if (numOfSignUpAttempts > 0 && errors) {
        this.setState({ signUpButtonColor: "secondary" });
      }
      if (Object.keys(errors).length === 0) {
        const url = 'api/user/signup';
        const method = 'POST';
        const data = {
          email: email,
          username: username,
          password: password,
        };
        makeRequest(url, method, null, data)
        .then(response => {
          if (response.message || !response) {
            this.setState({ signUpButtonColor: "secondary" });
          } else {
            history.replace('/login')
          }
        })
        .catch(error => console.error('Error:', error));
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { email, username, password, passwordConfirmation, errors, numOfSignUpAttempts, signUpButtonColor } = this.state;
    return (
      <form className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>Create Account</header>
          <TextField
            id="email"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={email}
          />
          <ErrorMessage error={errors.email} condition={numOfSignUpAttempts > 0} />
          <TextField
            id="username"
            label="User Name"
            placeholder="user_1"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={username}
          />
          <ErrorMessage error={errors.username} condition={numOfSignUpAttempts > 0} />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={password}
          />
          <ErrorMessage error={errors.password} condition={numOfSignUpAttempts > 0} />
          <TextField
            id="passwordConfirmation"
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={passwordConfirmation}
          />
          <ErrorMessage error={errors.passwordConfirmation} condition={numOfSignUpAttempts > 0} />
          <Button onClick={this.handleSubmit} variant="outlined" color={signUpButtonColor} className={classes.button}>
            SignUp
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/login'>
            Login
          </Button>
        </Paper>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, null) (withStyles(styles)(Login));