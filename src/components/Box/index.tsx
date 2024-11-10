import { DetailedHTMLProps, HtmlHTMLAttributes, CSSProperties, useMemo, PropsWithChildren  } from "react"
import "./index.less"
import { FlexProps } from "antd"
export interface IBoxProps extends  CSSProperties {
    className?:string,
    attrs?:Omit<DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>,HTMLDivElement>,'style'|'className' |'children'>
   
    isFull?:boolean
}


const Box = ({children,className='',attrs={},isFull=false,  ...props}:PropsWithChildren<IBoxProps>)=>{
    const fullClass = useMemo(()=> isFull?'full':"" ,[isFull])
    return <div className={`box-warper ${fullClass} ${className}`} {...attrs} style={props}>{children}</div>
   

}


export default Box