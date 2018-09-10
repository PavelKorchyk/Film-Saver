const api = "/api";
const signUp = "/user/signup/";
const login = "/auth/login/";
const genres = "/film/categories/";
const comment = "/comment/";
const user = "/user/";
const rating = "/rating/";
const films = "/films/";

export function createSignUpUrl() {
  return `${api}${signUp}`;
}

export function createLoginUrl() {
  return `${api}${login}`;
}

export function createGenresUrl() {
  return `${api}${genres}`;
}

export function createGenreUrl(genreId) {
  return `${api}${genres}${genreId}`;
}

export function createFilmUrl(film) {
  return `${api}${film}`;
}

export function createCommentUrl(film) {
  return `${createFilmUrl(film)}${comment}`;
}

export function createRatingUrl(userId) {
  return `${api}${user}${userId}${rating}`;
}

export function createFilmsUrl(urlData) {
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