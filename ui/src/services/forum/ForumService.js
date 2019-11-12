import {apiRequest} from "../ApiRequest";

export function serviceGetCategories() {
  return apiRequest({
    url: '/api/forum/categories',
    method: 'GET'
  })
}

export function serviceGetTopics(categoryUid) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryUid + '/topics',
    method: 'GET'
  })
}

export function serviceAddTopic(categoryUid, data) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryUid + '/topics',
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function serviceEditTopic(categoryUid, topicUid, data) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryUid + 'topics/' + topicUid,
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function serviceGetPosts(topicUid) {
  return apiRequest({
    url: '/api/forum/topics/' + topicUid + '/posts',
    method: 'GET'
  })
}

export function serviceAddPost(topicUid, data) {
  return apiRequest({
    url: '/api/forum/topics/' + topicUid + '/posts',
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function serviceEditPost(topicUid, postUid, data) {
  return apiRequest({
    url: '/api/forum/topics/' + topicUid + '/posts/' + postUid,
    method: 'PUT',
    body: JSON.stringify(data)
  })
}
