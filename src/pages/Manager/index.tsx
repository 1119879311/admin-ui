import React from "react";
import { Link } from "react-router-dom";
import {useGlobalStore} from "@/model/global"
import { Button } from "antd";
const App = () => {
  const state = useGlobalStore()
  console.log("state",state)
    return <div>"user"
      {state.a}
      <Button onClick={()=>{
        console.log(state.getA())
      }}>getA</Button>
      <Button onClick={()=>{
        state.setA(state.a+1)
      }}>setA</Button>

      <Link to={"/admin/role"}>role</Link>
      <Link to={"/admin/customer"}>customer</Link>
    </div>;
  };
  
  export default App;