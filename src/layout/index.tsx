
import { Suspense, useEffect, useState } from "react"
import PageLayout from "../components//Layout/index"
import { Navigate, Outlet } from "react-router-dom"
import {observer} from "mobx-react"
import {menuData} from "./mock"
import { useGlobalStore } from "@/model/global"
const BasicLayout = ()=>{
    const state = useGlobalStore();
    console.log("state", state);
  
    const [leftMenu,setLeftMenu] = useState<any[]>([]);
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        console.log("初始化")
        setTimeout(()=>{
            setLoading(false)
            setLeftMenu(menuData)
        },3000)
    },[])

    

    return  state.token?<PageLayout leftMenu={leftMenu} loading={loading} isFooter={false}><Outlet /></PageLayout>: <Navigate to="/login" replace={true} />
}

export default observer(BasicLayout)