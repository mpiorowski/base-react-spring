import {apiRequest} from "../ApiRequest";


export function serviceNotificationFindAll() {
  return apiRequest({
    url: `/api/notifications`,
    method: 'GET'
  })
}

export function serviceNotificationRead(uid) {
  return apiRequest({
    url: `/api/notifications/`+uid,
    method: 'PATCH'
  })
}


export function serviceNotificationDelete(uid) {
  return apiRequest({
    url: `/api/notifications/`+uid,
    method: 'DELETE'
  })
}
