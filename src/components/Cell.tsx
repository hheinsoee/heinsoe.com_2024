import dayjs from "dayjs";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { technology } from "@constant";
import { Image, Tag } from "antd";
import { useTheme } from "@/context/theme";
import conf from "@config";

interface InlineDateProps {
  date: string;
  className: string;
}

export const InlineDate: React.FC<InlineDateProps> = ({ date, className }) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <CalendarOutlined /> {dayjs(date).format(conf.dateFormat)}
    </div>
  );
};

interface CellProps {
  type: string;
  value: any;
  className?: string;
}

const Cell: React.FC<CellProps> = ({ type, value, className = "" }) => {
  const theme: any = useTheme();

  const components: { [key: string]: JSX.Element } = {
    date: <InlineDate date={value} className={className} />,
    technology: (
      <div
        className={`inline-flex gap-[0.2rem] px-[0.25rem] rounded-md items-center ${className}`}
        style={{
          background: theme.theme.token.colorPrimary_(50, 10),
          color: theme.theme.token.colorPrimary_(50, 100),
        }}
      >
        {technology?.[String(value)?.toLowerCase()]?.Icon({})} 
        {String(value)?.toLowerCase()}
      </div>
    ),
  };

  return components[type] || <span>{value}</span>;
};

export default Cell;
