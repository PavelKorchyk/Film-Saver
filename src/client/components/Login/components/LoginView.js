import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const LoginView = ({ 
  classes, 
  errors, 
  email, 
  password, 
  signInButtonColor, 
  onChange, 
  onSubmit 
}) => {
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
            onChange={onChange}
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
            onChange={onChange}
          />
          <Button onClick={onSubmit} variant="outlined" color={signInButtonColor} className={classes.button}>
            Login
          </Button>
          <Button variant="outlined" className={classes.button} component={Link} to='/signup'>
            SignUp
          </Button>
        </Paper>
      </form>
  )
}

export default withStyles(styles)(LoginView);