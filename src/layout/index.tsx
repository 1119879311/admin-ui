
import { Suspense, useEffect, useState } from "react"
import PageLayout from "../components//Layout/index"
import { Outlet } from "react-router-dom"

import {menuData} from "./mock"
const BasicLayout = ()=>{
    const [leftMenu,setLeftMenu] = useState<any[]>([]);
    useEffect(()=>{
        console.log("初始化")
        setTimeout(()=>{
            setLeftMenu(menuData)
        },3000)
    },[])
    return <PageLayout leftMenu={leftMenu} ><Outlet /></PageLayout>
}

export default BasicLayout