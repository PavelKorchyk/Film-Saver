const history = require('./history');

const makeRequest = (url, method, data) => {
  let headers = new Headers();
  headers.set("Authorization", `JWT ${localStorage.getItem('token')}`);
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 401) {
        history.default.replace('/login');
      } else if (response.status === 400) {
        console.warn('Bad request');
        return null;
      } else if (response.status === 200) {
        return response.json();
      } else {
        console.log('Response status is not 200')
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = makeRequest;