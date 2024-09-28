import axios from "axios";

import { message} from 'antd';
import localStore from "@/utils/localStore";

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


 

export default requsetInstance
