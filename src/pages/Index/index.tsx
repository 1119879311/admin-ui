import { useGlobalStore } from "@/model/global";
import { Button } from "antd";
import {observer } from "mobx-react"
const App = (() => {
  const state = useGlobalStore();
  console.log("state", state);

  return (
    <div>
      index
      {state.token}
      <Button
        onClick={() => {
          console.log(state.getA());
        }}
      >
        getA
      </Button>
      <Button
        onClick={() => {
          state.setA(state.a + 1);
        }}
      >
        setA
      </Button>

       <Button onClick={()=>state.setToken('')}> 退出登录</Button>
    </div>
  );
});

export default  observer(App);
