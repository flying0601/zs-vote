import axios from 'axios'
import qs from 'qs'
const root = '/api'
function $http (type, url, params, status, baseURL = root) {
  return new Promise((resolve, reject) => {
    let postParams = {}
    const instance = axios.create({
      timeout: 30000
    })
    postParams = params
    let fetchData = {
      method: type,
      url: `${baseURL}${url}`,
      data: qs.stringify(postParams)
    }
    if (type === 'get' || type === 'GET') {
      fetchData = {
        method: type,
        url: `${baseURL}${url}`,
        params: postParams
      }
    }
    instance(fetchData).then(response => {
      const res = response.data
      if (res.errno === status) {
        resolve(res)
      } else {
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
function $file (type, url, params, status, baseURL = root) {
  return new Promise((resolve, reject) => {
    let postParams = {}
    const instance = axios.create({
      timeout: 30000
    })
    postParams = params
    let fetchData = {
      method: type,
      url: `${baseURL}${url}`,
      data: postParams,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    instance(fetchData).then(response => {
      const res = response.data
      if (res.errno === status) {
        resolve(res)
      } else {
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
export {
  $http,
  $file
}
