import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeRequest from '../../../services/makeRequest';
import history from '../../../services/history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createLoginUrl } from '../../../services/createURL';
import LoginView from '../components/LoginView';
import * as actionCreators from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

const mapStateToProps = (store) => {
  return {
    token: store.user.token,
    signInButtonColor: store.user.signInButtonColor,
    error: store.user.error,
  };
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
      const data = {
        email: email,
        password: password,
      };
      const { actions: { loginRequest } } = this.props;
      loginRequest(data);
    }
  }

  render() {
    const { errors, email, password } = this.state;
    const props = {
      errors: this.props.error || errors, 
      email, 
      password, 
      signInButtonColor: this.props.signInButtonColor,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    }
    return (
      <LoginView {...props} />
    );
  }
} 

export default connect (mapStateToProps, mapDispatchToProps)(Login);
