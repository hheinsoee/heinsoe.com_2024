import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Spin />
    </div>
  );
};
