const initialState = {
  email: '',
  username: '',
  token: '',
  isLogedIn: false,
  isSearchOn: false,
  searchValue: '',
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
    case 'SEARCH_ON':
      return {
        ...state,
        isSearchOn: true,
      }
    case 'SEARCH_OFF':
      return {
        ...state,
        isSearchOn: false,
      }
    case 'ADD_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.searchValue,
      }
    case 'REMOVE_SEARCH_VALUE':
      return {
        ...state,
        searchValue: '',
      }
    default:
      return state;
  }
}

export default user;