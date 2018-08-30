const history = require('./history');

const makeRequest = (url, method, token, data ) => {
  let headers = new Headers();
  headers.set("Authorization", `JWT ${token}`);
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      switch(response.status) {
        case 401:
          history.default.replace('/login');
          break;
        case 400:
          console.warn('Bad request');
          return null;
        case 200:
          return response.json();
        default:
          console.log('Response status is not 200')
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = makeRequest;