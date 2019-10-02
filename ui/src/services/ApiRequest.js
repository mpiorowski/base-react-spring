import {ACCESS_TOKEN} from "../config/AppConfig";

export const apiRequest = (options) => {

  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response => {
    if (response.ok) {
      return response.json();
      // response.json().then(json => {
      //   if (!response.ok) {
      //     return Promise.reject(json);
      //   }
      //   return json;
      // })
    } else {
      return Promise.reject(response);
    }
  });
};
