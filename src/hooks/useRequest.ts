
import requsetInstance from "@/api/request";
import { AxiosRequestConfig } from "axios";
import get from "lodash/get";
import { useEffect, useRef, useState } from "react";


export interface IRequestOption<T=any> {
    initData?:T,
    data?:T,
    loading?:boolean,
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
    const {isInitFetch=true} = options;
    const [data,setData] = useState(  options.data ||  options.initData)
    const [loading,setLoading] =useState(options.loading)
    const initFetch = useRef(isInitFetch)
    const onQuery = async ()=>{
       try {
        if(options.data){
            return
        }

        if(!config.url){
            throw new Error("url 不能为空")
        }

        options.loading && setLoading(true)
        const {data,params ,url,headers,...reqProps} = config;
        let modifyConfig = {data,params ,url,headers}
        const newConfig = (await options.beforeRequest?.(modifyConfig)) || modifyConfig

        let result = await  requsetInstance({...reqProps,...newConfig});
        let resData = result.data
        let callResData= (await options.afterResponse?.(resData)) || resData
        let lastData = options.dataPath ?get(callResData,options.dataPath): callResData;
        setData(lastData || options.emptyValue)
        options.dataCallback?.(lastData || options.emptyValue)
       } catch (error) {
         options.errorCallback?.(error)
       }finally{
        options.loading && setLoading(true)
       }
       
    }

    useEffect(()=>{
        // 清空
        if(options.deepValue===null){
            setData(options.emptyValue || options.initData);
            initFetch.current = true
            return
        }
        if(initFetch.current){
            onQuery()
        }
        initFetch.current = true

    },[options.deepValue])
    return {data,setData,loading,setLoading,onQuery}
}   

export default useRequest