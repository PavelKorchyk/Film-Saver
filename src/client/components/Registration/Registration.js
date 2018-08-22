import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from '../../validate';

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
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      userName: '',
      password: '',
      passwordConfirmation: '',
      errors: 'no info',
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
    if(Object.keys(this.state.errors).length === 0) {
      console.log('let it be')
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
          <header className={classes.header}>Registration</header>
          <TextField
            id="email"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.email}
          />
          <TextField
            id="userName"
            label="User Name"
            placeholder="user_1"
            className={classes.textField}
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.userName}
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.password}
          />
          <TextField
            id="passwordConfirmation"
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={this.onFieldChange}
            value={this.state.passwordConfirmation}
          />
          <Button onClick={this.handleSubmit} variant="outlined" color="primary" className={classes.button}>
            Register
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