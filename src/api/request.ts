
import axios, { AxiosRequestConfig } from "axios";

import { message} from 'antd';
import localStore from "@/utils/localStore";
import { get, omit, pick } from "lodash";

const requsetInstance = axios.create({
  baseURL:"/api"
})
//拦截请求

requsetInstance.interceptors.request.use(function (req) {
    let token:string = ''
    try {
         token = localStore.get("ADMIN_TOKEN") || ''  
    } catch (error) {
         token = "";
    }
    req.headers.Authorization = 'Bearer ' +token;
    return req;
}, function (error) {
   
    return Promise.reject(error);
});

// 服务器返回的数据状态code:

// "NoToken":401, //缺失或者过期token 
// "NoAuth":403, //无权限操作
// "Success":200 //操作成功
// 其他：操作失败或者服务错误

//拦截响应
requsetInstance.interceptors.response.use(function (res) {
    var resData = res.data;
    if(res.headers['content-type'].indexOf('application/json')===-1){
        return res 
    }
   console.log("res0",resData)
   if(!resData.success){
     message.error(resData.message||"操作异常")
     return Promise.reject(resData);
   }
   return resData
   
    // return res;
  }, function (error) {
   
    message.error(error.response.data.message||"服务器异常，操作失败")
    return Promise.reject(error.response.data);
  });



export interface IRequestOption<T=any> extends AxiosRequestConfig<T> {

  errMsg?:boolean | string,
  successMsg?:boolean |string
  dataPath?:string,
  getRequestParam?:(data:any)=>any
  getRequestData?:(data:any)=>any
  beforeRequest?:(data:AxiosRequestConfig)=>T
  afterResponse?:(data:any)=>T,
  errorCallback?:(error:any)=>void,
  dataCallback?:(data:T)=>void

}


export const request = async (option:IRequestOption)=>{
  try {
    if(!option.url){
      return Promise.reject({message:"url 不能为空"})
    }
    if(option.method!="get" && option.getRequestData){
      option.data = option.getRequestData(option.data)
    }
    if(option.getRequestParam){
      option.params = option.getRequestParam(option.params)
    }
    if(option.beforeRequest){
      let resBefore = await option.beforeRequest(option);
      if(resBefore===false){
        return Promise.reject({message:"中断请求"})
      }
    }

    const newOption = pick(option,['errMsg','successMsg','dataPath','getRequestParam','getRequestData','beforeRequest','afterResponse','errorCallback','dataCallback']) as AxiosRequestConfig
    let result:any = await requsetInstance.request(newOption)
    
    if(!result.success && option.errMsg){
      let defaultMsg = typeof option.errMsg=="string"?option.errMsg : '操作异常'
      message.error(result.message || defaultMsg)
    }

    if(result.success && option.successMsg){
      let defaultMsg = typeof option.successMsg=="string"?option.successMsg : '操作异常'
      message.success(result.message || defaultMsg)
    }
    let newRes = result;
    if(option.afterResponse){
      newRes = option.afterResponse(result)
    }
    if(option.dataCallback){
      const {dataPath="data"} = option;
      option.dataCallback(dataPath ? get(newRes,dataPath):newRes)
    }
    return  option.dataPath? get(newRes,option.dataPath):newRes;

  } catch (error) {
    return Promise.reject(error)
  }

}

 

export default requsetInstance
