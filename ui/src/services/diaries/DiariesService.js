import {apiRequest} from "../ApiRequest";

export function serviceDiaryFindAll() {
  return apiRequest({
    url: `/api/diaries`,
    method: 'GET'
  })
}

export function serviceDiaryFindAllLimit(limit) {
  return apiRequest({
    url: `/api/diaries?limit=${limit}`,
    method: 'GET'
  })
}

export function serviceFindOrderByDate() {
  return apiRequest({
    url: `/api/diaries?orderBy=diary_date`,
    method: 'GET'
  })
}

export function serviceDiaryFindByDate(date) {
  return apiRequest({
    url: '/api/diaries' + (date === null ? '' : '?date=' + date),
    method: 'GET'
  })
}

export function serviceDiaryAdd(data) {
  return apiRequest({
    url: `/api/diaries`,
    method: 'POST',
    body: JSON.stringify(data)
  },)
}

export function serviceDiaryAddQuestion(uid, data) {
  return apiRequest({
    url: `/api/diaries/${uid}/questions`,
    method: 'POST',
    body: JSON.stringify(data)
  },)
}

export function serviceDiaryEdit(uid, data) {
  return apiRequest({
    url: `/api/diaries/${uid}`,
    method: 'PUT',
    body: JSON.stringify(data)
  },)
}

export function serviceDiaryDelete(uid,) {
  return apiRequest({
    url: `/api/diaries/${uid}`,
    method: 'DELETE'
  },)
}
