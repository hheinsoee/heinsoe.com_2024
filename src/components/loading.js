import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loading = ({className=''}) => {
  return (
    <div className={`flex justify-center items-center min-h-full ${className}`}>
      <Spin />
    </div>
  );
};
