import {apiRequest} from "./ApiRequest";

export function serviceGetRoles() {
  return apiRequest({
    url: `/api/users/roles`,
    method: "GET"
  })
}
