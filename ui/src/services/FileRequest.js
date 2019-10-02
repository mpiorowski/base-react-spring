import {ACCESS_TOKEN} from "../config/AppConfig";
import {saveAs} from 'file-saver';

export const fileRequest = (options) => {

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
      response.blob().then(blob => URL.createObjectURL(blob))
          .then(blob => saveAs(blob, 'dzienniczek.xlsx'));
    } else {
      return Promise.reject(response);
    }
  });
};
