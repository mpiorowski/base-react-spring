import {apiRequest} from "./ApiRequest";

export function serviceError(error, info) {
  console.log(error);
  return apiRequest({
    url: `/api/error`,
    method: "POST",
    body: JSON.stringify({message: error.message, stack: error.stack})
  })
}
