import axios from 'axios'

let baseURL = 'http://localhost:8080'
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

export const yearQuota=()=>{
    return axios.get('boardMap/yearQuota').then(res=>res.data)
}

export const initData=(params)=>{
    return axios.post('HisiliconList',params).then(res=>res.data)
}

export const spImportData = axios.defaults.baseURL + 'developPart/importDevelopPart'
