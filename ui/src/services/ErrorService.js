import {apiRequest} from "./ApiRequest";

export function serviceError(message, stack, componentStack) {
  return apiRequest({
    url: '/api/error',
    method: 'POST',
    body: JSON.stringify({message: message, stack: stack, componentStack: componentStack})
  })
}
