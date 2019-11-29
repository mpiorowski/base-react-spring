export const PROFILE = process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev';
export const devUser = {
  username: 'admin',
  password: 'pass'
};
export const ACCESS_TOKEN = 'authToken';

export const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
