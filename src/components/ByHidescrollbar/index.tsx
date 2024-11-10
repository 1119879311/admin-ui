import { CSSProperties, useCallback, useMemo, useRef } from "react";
import "./index.less";
export interface IAppProps {
  className?:string,
  type?:"full" |"flexAuto"
  style?:CSSProperties
  x?: boolean;
  y?: boolean;
}

function App({
  children,
  className='',
  style,
  type="full",
  x = false,
  y = false,
}: React.PropsWithChildren<IAppProps>) {
  let yStyles = useMemo(() => {
    return y ? "0" : "-17px";
  }, [y]);
  return (
    <div className={`by-hidescrollbar-warp ${type} ${className}`} style={style}>
      <div className="by-hidescrollbar-main" style={{ right: yStyles }}>
        {children}
      </div>
    </div>
  );
}

export default App;
