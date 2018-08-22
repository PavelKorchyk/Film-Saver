import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <header className={classes.header}>Registration</header>
          <TextField
            id="email-input"
            label="Email"
            placeholder="example@exm.com"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="userName-input"
            label="User Name"
            placeholder="user_1"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
          />
          <TextField
            id="passwordConfirmation-input"
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
          />
          <Button variant="outlined" color="primary" className={classes.button}>
            Register
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/login'>
            Login
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