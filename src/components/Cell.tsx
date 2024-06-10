import dayjs from "dayjs";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { technology } from "@constant";
import { Tag } from "antd";
import { useTheme } from "@/context/theme";
import Image from "next/image";
import app from "@config";

interface InlineDateProps {
  date: string;
  className: string;
}

export const InlineDate: React.FC<InlineDateProps> = ({ date, className }) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <CalendarOutlined /> {dayjs(date).format(app.dateFormat)}
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
        className={`inline-flex gap-2 px-2 rounded-md items-baseline ${className}`}
        style={{
          background: theme.theme.token.colorPrimary_(50, 10),
          color: theme.theme.token.colorPrimary_(50, 100),
        }}
      >
        {technology?.[String(value)?.toLowerCase()]?.Icon} {value}
      </div>
    ),
    featured_image: <Image src={value} width={100} height={100} alt="" />,
  };

  return components[type] || <span>{value}</span>;
};

export default Cell;
