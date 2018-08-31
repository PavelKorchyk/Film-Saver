const initialState = {
  email: '',
  username: '',
  token: '',
  isLogedIn: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.email,
        username: action.username,
        token: action.token,
        isLogedIn: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        email: null,
        username: null,
        token: null,
        isLogedIn: false,
      }
    default:
      return state;
  }
}

export default user;