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

  componentDidMount() {
    if (this.props.token) {
      history.replace('/');
    }
  }

  onFieldChange = (e) => {
    this.setState({[e.target.id]: e.target.value}, () => {
      const errors = {
        password: this.state.password,
        email: this.state.email,
        username: this.state.username,
        passwordConfirmation: this.state.passwordConfirmation,
      }
      this.setState({ errors: validate(errors) });
    });
  }

  handleSubmit = () => {
    if (
      !this.state.email &&
      !this.state.username &&
      !this.state.password &&
      !this.state.passwordConfirmation
    ) {
      this.setState({ signUpButtonColor: "secondary" });
    } else {
      this.setState({ numOfSignUpAttempts: this.state.numOfSignUpAttempts + 1 });
      if (this.state.numOfSignUpAttempts > 0 && this.state.errors) {
        this.setState({ signUpButtonColor: "secondary" });
      }
      if (Object.keys(this.state.errors).length === 0) {
        const url = 'api/user/signup';
        const method = 'POST';
        const data = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
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
            value={this.state.email}
          />
          <ErrorMessage error={this.state.errors.email} condition={this.state.numOfSignUpAttempts > 0} />
          <TextField
            id="username"
            label="User Name"
            placeholder="user_1"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.username}
          />
          <ErrorMessage error={this.state.errors.username} condition={this.state.numOfSignUpAttempts > 0} />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.password}
          />
          <ErrorMessage error={this.state.errors.password} condition={this.state.numOfSignUpAttempts > 0} />
          <TextField
            id="passwordConfirmation"
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.passwordConfirmation}
          />
          <ErrorMessage error={this.state.errors.passwordConfirmation} condition={this.state.numOfSignUpAttempts > 0} />
          <Button onClick={this.handleSubmit} variant="outlined" color={this.state.signUpButtonColor} className={classes.button}>
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