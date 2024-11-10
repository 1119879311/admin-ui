import { Button, Flex, Form, FormInstance, Space } from "antd";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import Box from "../Box";
import { DownOutlined } from "@ant-design/icons";
import "./index.less";
interface ISearchPanelProps {
  form?: FormInstance;
  onFinish?: (values: any) => void;
  moreBtnProps?:{ hide:boolean,onClick:Dispatch<SetStateAction<boolean>> }

  isBtn?:boolean
}


const SearchPanel = ({
  children,
  form,
  onFinish,
  moreBtnProps=undefined,
  isBtn=true
}: PropsWithChildren<ISearchPanelProps>) => {
  const [formIns] = Form.useForm(form);
//   const [expand, setExpand] = useState(false);
  return (
    <Form
      form={formIns}
      className="search-warp"
      onFinish={onFinish}
    
    >
      <Flex justify="space-between" align="start" gap={16}>
        <Flex wrap gap={24} flex={"auto"} className="formitem-list-inner">
          {children}
        </Flex>
        {
            isBtn && <Space size="small" className="search-action">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              onClick={() => {
                formIns.resetFields();
              }}
            >
              重置
            </Button>
            {
              moreBtnProps && <a
              style={{ fontSize: 12 }}
              onClick={() => {
                moreBtnProps.onClick?.(!moreBtnProps.hide);
              }}
            >
              <DownOutlined rotate={moreBtnProps.hide ? 0 : 180} />
              {moreBtnProps.hide ? "收起" : "展开"}
            </a>
            }
           
          </Space>
        }
       
      </Flex>
    </Form>
  );
};

export default SearchPanel;
