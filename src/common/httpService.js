import axios from 'axios'
import Vue from 'vue'

let baseURL = 'http://localhost:8081';
axios.defaults.baseURL = baseURL;
// Vue.prototype.$http = axios
// let axiosConfig = {
//   baseURL,
//   timeout: 1000
// }

// let instanceTmp = axios.create(axiosConfig)

// export default {
//   getAxios: instanceTmp,
//   getCanceToken: axios.CancelToken
// }

export const getAllUser = (params) => {
  return axios.post('user/getUsers', params).then(res => res.data)
}

export const initData = (params) => {
  return axios.post('HisiliconList', params).then(res => res.data)
}

// 以下为跑步统计接口

export const getRunList = (params) => {
  return axios.post('run/list', params).then(res => res.data)
}

export const countRunInOneMonth = (params) => {
  return axios.post('run/countInOneMonth', params).then(res => res.data)
}
export const countRunInOneYear = (params) => {
  return axios.post('run/countInOneYear', params).then(res => res.data)
}

export const addRunData = (params) => {
  return axios.post('run/add', params).then(res => res.data)
}

// 获取年月范围，可能不需要，待删除 -- 2021/2/2
export const getRunYearMonthScope = () => {
  return axios.get('run/getYearMonthScope').then(res=>res.data)
}
export const importRunData = axios.defaults.baseURL + '/run/import';

export const downloadRunDataTemplate = axios.defaults.baseURL + '/run/exportFile';

//
export const exportRunData = (param) => {
  return axios.post('run/export', param, {
    responseType: 'blob'
  }).then(res => res)
}
