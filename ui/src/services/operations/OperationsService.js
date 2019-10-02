import {apiRequest} from "../ApiRequest";

export function serviceOperationsFindAll() {
  return apiRequest({
    url: `/api/operations`,
    method: 'GET'
  })
}
