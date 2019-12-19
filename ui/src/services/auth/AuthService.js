import {apiRequest} from "../ApiRequest";

export function serviceGetCurrentUser() {
  return apiRequest({
    url: "/api/auth/user",
    method: "GET"
  })
}

export function serviceLogIn(credentials) {
  return apiRequest({
    url: "/api/auth/log",
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function serviceRegisterCode(credentials) {
  return apiRequest({
    url: "/api/auth/register/code",
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function serviceRegister(credentials) {
  return apiRequest({
    url: "/api/auth/register/user",
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function serviceRecoverCode(userEmail) {
  return apiRequest({
    url: "/api/auth/recover/code",
    method: "POST",
    body: userEmail
  });
}

export function serviceRecover(credentials) {
  return apiRequest({
    url: "/api/auth/recover/user",
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function serviceCheckUserName(userName) {
  return apiRequest({
    url: "/api/auth/register/user-name",
    method: "POST",
    body: userName
  });
}

export function serviceCheckUserEmail(userEmail) {
  return apiRequest({
    url: "/api/auth/register/user-email",
    method: "POST",
    body: userEmail
  });
}
