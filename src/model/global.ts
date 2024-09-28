import createStore from "@/utils/store";
import { makeAutoObservable } from "mobx"
import localStore from "@/utils/localStore";

interface IUserInfo {
    [key:string]:any
}

// 全局状态
class GlobalModel {
    token:string=localStore.get("ADMIN_TOKEN") ||""
    userInfo:IUserInfo={}
    menuList:any[] = []
    authList:any = {}
    a:number = 1;
    b:number=2
    constructor(){
        
        makeAutoObservable(this)
    }


    setToken(value:string=''){
       this.token = value;
       if(value){
        localStore.set("ADMIN_TOKEN",value)
       }else{
        localStore.delete("ADMIN_TOKEN")
       }
    }

    setA = (value:number)=>{
        this.a = value
    }
    getA = ()=>{
        return this.a
    }

}

export const globalModel = new GlobalModel()

const store = createStore({
    default: globalModel
})

// setTimeout(()=>{
//     globalModel.setA(globalModel.a+1)
// },10000)
export const useGlobalStore =()=> store.useModel("default")
export default store
