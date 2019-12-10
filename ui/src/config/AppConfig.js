import * as moment from "moment";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCoffee, faComment, faNewspaper, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

export const PROFILE = process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev';
export const devUser = {
  username: 'admin',
  password: 'pass'
};
export const ACCESS_TOKEN = 'authToken';

export const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const momentDateTimeLanguage = 'pl';

export const setUpMomentDateTimeLanguage = (lang) => {
  moment.locale(lang);
};

export function initFontAwesomeIcons() {
  library.add(faComment, faPencilAlt, faCoffee, faNewspaper)
}
