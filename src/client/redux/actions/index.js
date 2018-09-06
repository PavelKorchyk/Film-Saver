export const logIn = (user) => ({
  type: 'LOGIN',
  userId: user._id,
  email: user.email,
  username: user.username,
  token: user.token,
  ratedFilms: user.ratedFilms,
});

export const logOut = () => ({
  type: 'LOGOUT',
})

export const addSearchValue = (searchValue) => ({
  type: 'ADD_SEARCH_VALUE',
  searchValue
})

export const removeSearchValue = () => ({
  type: 'REMOVE_SEARCH_VALUE',
})

export const loadingDone = () => ({
  type: 'LOADING_DONE',
})

export const loading = () => ({
  type: 'LOADING',
})

export const changeSearchConditions = (sortType, sortValue) => ({
  type: 'CHANGE_SEARCH_CONDITIONS',
  sortType,
  sortValue
})

export const updateRatedFilms = (ratedFilms) => ({
  type: 'UPDATE_RATED_FILMS',
  ratedFilms
})