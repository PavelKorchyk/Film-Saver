export const logIn = user => ({
  type: 'LOGIN',
  userId: user._id,
  email: user.email,
  username: user.username,
  token: user.token,
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

export const changeSearchConditions = (sortType, sortValue) => ({
  type: 'CHANGE_SEARCH_CONDITIONS',
  sortType,
  sortValue
})