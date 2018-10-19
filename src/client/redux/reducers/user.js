const initialState = {
  email: '',
  userId: '',
  username: '',
  token: '',
  isLogedIn: false,
  searchValue: '',
  isLoadingDone: false,
  sortType: '$natural',
  sortValue: '1',
  ratedFilms: [],
  signInButtonColor: 'primary',
  errorMessage: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        email: action.response.data.email,
        userId: action.response.data.userId,
        username: action.response.data.username,
        token: action.response.data.token,
        isLogedIn: true,
        ratedFilms: action.response.data.ratedFilms,
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        signInButtonColor: 'secondary',
        errorMessage: 'Wrong email or password',
      }
    case 'LOGOUT':
      return {
        ...state,
        email: null,
        userId: null,
        username: null,
        token: null,
        isLogedIn: false,
        ratedFilms: [],
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
    case 'LOADING_DONE':
      return {
        ...state,
        isLoadingDone: true,
      }
    case 'LOADING':
      return {
        ...state,
        isLoadingDone: false,
      }
    case 'CHANGE_SEARCH_CONDITIONS':
      return {
        ...state,
        sortType: action.sortType,
        sortValue: action.sortValue,
      }
    case 'UPDATE_RATED_FILMS':
      return {
        ...state,
        ratedFilms: action.ratedFilms,
      }
    default:
      return state;
  }
}

export default user;