import {apiRequest} from "../ApiRequest";

export function serviceGetCategories() {
  return apiRequest({
    url: '/api/forum/categories',
    method: 'GET'
  })
}

export function serviceGetTopics(categoryId) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryId + '/topics',
    method: 'GET'
  })
}

export function serviceAddTopic(categoryId, data) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryId + '/topics',
    method: 'POST',
    body: JSON.stringify(data)
  })
}


export function serviceEditTopic(categoryId, topicId, data) {
  return apiRequest({
    url: '/api/forum/categories/' + categoryId + '/topics/' + topicId,
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function serviceGetPosts(topicId) {
  return apiRequest({
    url: '/api/forum/topics/' + topicId + '/posts',
    method: 'GET'
  })
}

export function serviceAddPost(topicId, data) {
  return apiRequest({
    url: '/api/forum/topics/' + topicId + '/posts',
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function serviceEditPost(topicId, postId, data) {
  return apiRequest({
    url: '/api/forum/topics/' + topicId + '/posts/' + postId,
    method: 'PUT',
    body: JSON.stringify(data)
  })
}
