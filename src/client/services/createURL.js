const api = "/api";
const signUp = "/user/signup/";
const login = "/auth/login/";
const genres = "/film/categories/";
const comment = "/comment/";
const user = "/user/";
const rating = "/rating/";
const films = "/films/";

export function signUpUrl() {
  return `${api}${signUp}`;
}

export function loginUrl() {
  return `${api}${login}`;
}

export function genresUrl() {
  return `${api}${genres}`;
}

export function genreUrl(genreId) {
  return `${api}${genres}${genreId}`;
}

export function filmUrl(film) {
  return `${api}${film}`;
}

export function commentUrl(film) {
  return `${filmUrl(film)}${comment}`;
}

export function ratingUrl(userId) {
  return `${api}${user}${userId}${rating}`;
}

export function filmsUrl(urlData) {
  let url = "";
  for (var key in urlData) {
    if (urlData[key]) {
      if (url != "") {
        url += "&";
      }
      url += key + "=" + urlData[key];
    } else {
      if (url != "") {
        url += "&";
      }
      url += key + "=" + "";
    }
  }
  return `${api}${films}?${url}`;
}