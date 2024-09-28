export const isNotEmpty = (value:unknown)=>{
    return value !=='' && value !==undefined && value !==null
}



/**
 *  从对象中排除指定项
 * @param data 
 * @param keys 
 * @returns 
 */
export function omit<T extends Record<string,any>>(data:T, keys:Array<keyof T>){
    let result = {} as T;
    let mapkeys = new Set(keys)
    for (const key in data) {
        if(!mapkeys.has(key)){
            result[key] = data[key]
        }
    }
    return result 
   
}


/**
 *  从data 数据中根据路径取值
 * @param data 
 * @param pathkey 
 */
export function get<T extends any>(data:T,pathkey:string,defaultValue?:any){
   if(!data) return defaultValue 
   let pathList = pathkey.split(".");
   if(!pathList.length) return data || defaultValue
   let currentValue:any = data;
   let len = pathList.length;
   let start = 0
   while (len>start) {
    try {
        currentValue = currentValue[ pathList[start]]
        start++
    } catch (error) {
        currentValue = defaultValue
        break
    }
   }
   return currentValue
}
