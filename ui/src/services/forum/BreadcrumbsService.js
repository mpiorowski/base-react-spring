import {apiRequest} from "../ApiRequest";

export function serviceGetForumBreadcrumbs() {
  return apiRequest({
    url: `/api/forum/breadcrumbs`,
    method: "GET"
  })
}
