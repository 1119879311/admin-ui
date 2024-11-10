import { useEffect, useRef } from "react"

export const useUpdate = (fn:Function,deepValue:any)=>{
    const isInint = useRef(true)
    useEffect(()=>{
        if(isInint.current){
            return
        }
        isInint.current = false
        fn?.()
    },deepValue)

}