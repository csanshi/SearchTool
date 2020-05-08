/**
 * Created by sanshi on 4/5/20.
 */
import request from '@/utils/request'

export function getConfirmedData() {
  return request({
    url: 'getConfirmedData',
    method: 'get'
  })
}

export function getUnconfirmedData() {
  return request({
    url: 'getUnconfirmedData',
    method: 'get'
  })
}

export function getFeedback() {
  return request({
    url: 'getFeedback',
    method: 'get'
  })
}

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}



export function addUnconfirmedData(newInfo) {
  return request({
    url: 'addUnconfirmedData',
    method: 'post',
    data: newInfo
  })
}

export function submitUnconfirmedData(id) {
  return request( {
    url: 'submitUnconfirmedData',
    method: 'get',
    params: { id }
  })
}

export function updateUnconfirmedData(newInfo) {
  return request({
    url: 'updateUnconfirmedData',
    method: 'post',
    data: newInfo
  })
}

export function deleteUnconfirmedData(id) {
  return request({
    url: 'deleteUnconfirmedData',
    method: 'get',
    params: { id }
  })
}


export function addFeedback(id, errInfo) {
  return request({
    url: 'addFeedback',
    method: 'get',
    params: {id,  errInfo}
  })
}
export function updateConfirmedDataAccordingToFeedback(editedConfirmedData) {
  return request({
    url: 'updateConfirmedDataAccordingToFeedback',
    method: 'post',
    data: editedConfirmedData
  })
}
export function deleteFeedback(id) {
  return request({
    url: 'deleteFeedback',
    method: 'get',
    params: { id }
  })
}


///////////////////////////////////////////////////////
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}


