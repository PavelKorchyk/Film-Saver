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
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.email,
        userId: action.userId,
        username: action.username,
        token: action.token,
        isLogedIn: true,
        ratedFilms: action.ratedFilms,
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