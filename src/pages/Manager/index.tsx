import React, { useState } from "react";

import { useGlobalStore } from "@/model/global";
import { Button, Form, Input, Select } from "antd";
import PageWarper from "@/components/PageWarper";
import ByHidescrollbar from "@/components/ByHidescrollbar"
import SearchPanel from "@/components/SearchPanel";
import CustomTable from "@/components/CustomTable";
const App = () => {
  const state = useGlobalStore();
  const [hide,setHide] = useState(false)
  const [form] = Form.useForm();
  const onFinish=(values:any)=>{
    console.log("values",values)
  }
  return (
    <PageWarper>
      
      <SearchPanel form={form} onFinish={onFinish} >
        <Form.Item name={"name"} label="用户名" >
          <Input/>
        </Form.Item>
        <Form.Item name={"status"} label="状态">
          <Select options={[{value:"1",label:"开启"},{value:"2",label:"禁用"}]}/>
        </Form.Item>
       
      </SearchPanel>
      <CustomTable>
        表格
      </CustomTable>
    </PageWarper>
  );
};

export default App;
