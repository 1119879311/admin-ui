import { useMount } from '@/hooks/useMount';

import requsetInstance from "@/api/request";
import { AxiosRequestConfig } from "axios";
import {get} from "lodash";
import { useEffect, useRef, useState } from "react";
import { useUpdate } from './useUpdate';


export interface IRequestOption<T=any> {
    initData?:T,
    data?:T,
    isLoading?:boolean,
    deepValue?:any,
    isInitFetch?:boolean,
    emptyValue?:any,
    dataPath?:string,
    beforeRequest?:(data:any)=>T
    afterResponse?:(data:any)=>T,
    errorCallback?:(error:any)=>void,
    dataCallback?:(data:T)=>void
}

const useRequest = <T>(config:AxiosRequestConfig,options:IRequestOption<T>={})=>{
    const {isInitFetch=true} = options || {}
    const [data,setData] = useState(  options.data ||  options.initData)
    const [loading,setLoading] =useState(false)
    const onQuery = async ()=>{
       try {
        if(!config.url){
            return
        }
        options.isLoading && setLoading(true)
        const {data,params ,url,headers,...reqProps} = config;
        let modifyConfig = {data,params ,url,headers}
        const newConfig = (await options.beforeRequest?.(modifyConfig)) || modifyConfig
        let result = await  requsetInstance({...reqProps,...newConfig});
        let resData = result.data
        let callResData= (await options.afterResponse?.(resData)) || resData
        let lastData = options.dataPath ?get(callResData,options.dataPath): callResData;
        setData(lastData || options.emptyValue)
        options.dataCallback?.(lastData || options.emptyValue)
        return Promise.resolve(lastData)
       } catch (error) {
         options.errorCallback?.(error)
         return Promise.reject(error)
       }finally{
        options.isLoading && setLoading(false)
       }
       
    }
    useMount(()=>{
        if(isInitFetch){
            onQuery()
        }
    })
    useUpdate(()=>{
        if(options.deepValue===null){
            setData(options.emptyValue ||options.initData)
        }else{
            onQuery()
        }
        onQuery()
    },[options.deepValue])
    return {data,setData,loading,setLoading,onQuery}
}   

export default useRequest