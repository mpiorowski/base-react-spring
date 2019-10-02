import {apiRequest} from "./../ApiRequest";


export function serviceUsersFindAll() {
  return apiRequest({
    url: "/api/users",
    method: "GET"
  })
}

export function serviceGetUsers() {
  return apiRequest({
    url: "/api/user",
    method: "GET"
  })
}

export const serviceAddUser = (user) => {
  return apiRequest({
    url: `/api/users`,
    method: "POST",
    body: JSON.stringify(user)
  })
};

export const serviceUpdateUser = (key, user) => {
  return apiRequest({
    url: `/api/users/${key}`,
    method: "PUT",
    body: JSON.stringify(user)
  })
};


export const serviceDeleteUser = (key) => {
  return apiRequest({
    url: `/api/users/${key}`,
    method: "DELETE"
  })
};
