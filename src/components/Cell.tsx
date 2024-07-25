import dayjs from "dayjs";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { technology } from "@constant";
import { Image, Tag } from "antd";
import { useTheme } from "@/context/theme";
import conf from "@config";
import { Tech } from "@interface";
import { useRepo } from "@/context/repo";
import myLink from "@/link";

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
  // const theme: any = useTheme();
  // const { repo } = useRepo();
  const components: { [key: string]: JSX.Element } = {
    date: <InlineDate date={value} className={className} />,
    // technology: (
    //   <div
    //     className={`h-[1.3rem] inline-flex gap-[0.2rem] px-[0.25rem] rounded-md items-center ${className}`}
    //     style={{
    //       background: theme.theme.token.colorPrimary_(50, 10),
    //       color: theme.theme.token.colorPrimary_(theme.isDark ? 50 : 30, 100),
    //     }}
    //   >
    //     <img
    //       className="h-4"
    //       src={myLink.image(
    //         repo?.techs?.data.find(
    //           (t: Tech) => t.name.toLowerCase() == String(value)?.toLowerCase()
    //         )?.image?.fileName,
    //         "s"
    //       )}
    //       alt=""
    //     />
    //     {/* {technology?.[String(value)?.toLowerCase()]?.Icon({})} */}
    //     {value}
    //   </div>
    // ),
  };

  return components[type] || <span>{value}</span>;
};

export default Cell;

export const TechTag = ({
  id,
  className,
  label,
}: {
  id: number;
  className?: string;
  label?: boolean;
}) => {
  const { repo } = useRepo();
  const theme: any = useTheme();
  const t: Tech = repo?.techs?.data.find((t: Tech) => t.id == id);

  return label ? (
    <div
      className={`h-[1.3rem] inline-flex gap-[0.2rem] px-[0.25rem] font-light rounded-md items-center ${className}`}
      style={{
        background: theme.theme.token.colorPrimary_(50, 10),
        color: theme.theme.token.colorPrimary_(theme.isDark ? 50 : 30, 100),
      }}
    >
      {t?.image ? (
        <img
          className="h-[1rem] block"
          src={myLink.image(t?.image?.fileName, "s")}
          alt={t.name}
        />
      ) : (
        ""
      )}
      {t?.name}
    </div>
  ) : (
    <>
      {t?.image ? (
        <img
          className="h-[1rem] block"
          src={myLink.image(t?.image?.fileName, "s")}
          alt={t.name}
          title={t.name}
        />
      ) : (
        ""
      )}
    </>
  );
};
