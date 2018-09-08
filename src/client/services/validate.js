const validate = values => {
    const errors = {}
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or more';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 15) {
      errors.username = 'Too long';
    }
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Required';
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = 'Password does not match';
    }
    return errors;
}

export default validate;

