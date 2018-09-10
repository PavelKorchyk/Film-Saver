import { MIN_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, EMAIL_VALIDATION_REGEX } from '../services/constants';

const validate = values => {
    const errors = {}
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = 'Must be 6 characters or more';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!EMAIL_VALIDATION_REGEX.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > MAX_USERNAME_LENGTH) {
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

