export const logIn = user => ({
  type: 'LOGIN',
  email: user.email,
  username: user.username,
  token: user.token,
});

export const logOut = () => ({
  type: 'LOGOUT',
})