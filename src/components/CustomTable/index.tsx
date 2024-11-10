import { PropsWithChildren } from "react";
import ByHidescrollbar from "../ByHidescrollbar";
import "./index.less"
import { Table, TableProps } from "antd";
import useRequest from "@/hooks/useRequest";
interface ICustomTableProps  extends TableProps{}



const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

const CustomTable = ({ children }: PropsWithChildren<ICustomTableProps>) => {

    const {data} = useRequest({
        url:"/manager/"
    })

    console.log("data",data)
  return (
    <ByHidescrollbar
      y={true}
      className="custom-table-warp"
      type="flexAuto"
      style={{ margin: 16, marginRight: 0 }}
    >
      <div className="custom-table-scroll">
        <div className="custom-table-inner"><Table size="small" dataSource={dataSource} columns={columns} /></div>
      </div>
    </ByHidescrollbar>
  );
};

export default CustomTable;
