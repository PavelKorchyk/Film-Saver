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
          history.default.push('/login');
          break;
        case 400:
          console.warn('Bad request');
          return null;
        case 200:
          return response.json();
        default:
          return null;
      }
    })
    .catch(err => console.log(err));
}

module.exports = makeRequest;