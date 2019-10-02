import * as moment from "moment";
import 'moment/locale/pl';

export const momentDateTimeLanguage = 'pl';

export const setUpMomentDateTimeLanguage = (lang) => {
  moment.locale(lang);
};
