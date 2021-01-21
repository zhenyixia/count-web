import axios from 'axios'

let baseURL = 'http://localhost:8081'
axios.defaults.baseURL = baseURL
/* let axiosConfig = {
  baseURL,
  timeout: 1000
}

let instanceTmp = axios.create(axiosConfig)

export default {
  getAxios: instanceTmp,
  getCanceToken: axios.CancelToken
} */

export const getAllUser = (params) => {
  return axios.post('user/getUsers',params).then(res => res.data)
}

export const initData = (params) => {
  return axios.post('HisiliconList', params).then(res => res.data)
}

export const spImportData = axios.defaults.baseURL + 'developPart/importDevelopPart'


// 以下为跑步统计接口

export const getRunList = (params) => {
  return axios.post('run/list',params).then(res => res.data)
}

export const addRunData = (params) => {
  return axios.post('run/add',params).then(res => res.data)
}

