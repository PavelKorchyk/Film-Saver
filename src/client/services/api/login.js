export default {
  loginRequest: (data) => ({
    url: '/auth/login/',
    method: 'post',
    data,
    headers: {
      Authorization: false,
    },
  })
}