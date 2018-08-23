import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from '../../validate';
import history from '../../history';

const styles = theme => ({
  root: {
    
  },
  paper: {
    "margin": "30px auto",
    "max-width": "300px",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "flex-wrap": "wrap",
  },
  header: {
    "flex": "1 0 50px",
    "align-self": "center",
    "font-size": "30px",
  },
  textField: {
    "flex": "1 0 50px",
    "align-self": "center",
    "margin-bottom": "0",
  },
  button: {
    margin: theme.spacing.unit,
  },
  error: {
    "color": "red",
    "margin": "0 auto", 
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      userName: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
      numOfSignUpAttempts: 0,
    };
  }

  onFieldChange = (e) => {
    this.setState({[e.target.id]: e.target.value}, () => {
      let errors = {
        password: this.state.password,
        email: this.state.email,
        userName: this.state.userName,
        passwordConfirmation: this.state.passwordConfirmation,
      }
      this.setState({ errors: validate(errors) })
    });
  }

  handleSubmit = () => {
    console.log(this.state.errors)
    this.setState({ numOfSignUpAttempts: this.state.numOfSignUpAttempts + 1 })
    if(Object.keys(this.state.errors).length === 0) {
      console.log('let it be')
      const url = 'api/user/signup';
      const data = {
        email: this.state.email,
        username: this.state.userName,
        password: this.state.password,
      };
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        history.replace('/login')
      })
      .catch(error => console.error('Error:', error));
    } else {
      console.log('Not so fast')
    }
  }

  render() {
    console.log(this.state.errors);
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

export default withStyles(styles)(Login);