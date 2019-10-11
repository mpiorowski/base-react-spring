import {apiRequest} from "../ApiRequest";

export function serviceGetUser() {
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

export function serviceRegisterCode(email) {
  return apiRequest({
    url: "/api/auth/register-code",
    method: "POST",
    body: email
  });
}

export function serviceRegister(credentials) {
  return apiRequest({
    url: "/api/auth/register",
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
