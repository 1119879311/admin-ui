import { CSSProperties, DetailedHTMLProps, HtmlHTMLAttributes, PropsWithChildren, useMemo } from "react"
import "./index.less"



interface IAppProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>,HTMLDivElement>{
    
}

const PageWarper = ({children,className="",...props}:PropsWithChildren<IAppProps>)=>{
    return  <div className={`page-inner ${className}`} {...props}>{children}</div>
}

export default PageWarper
