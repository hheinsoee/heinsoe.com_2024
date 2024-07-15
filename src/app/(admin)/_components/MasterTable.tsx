"use client";
import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useMemo } from "react";
import { snakeToTitleCase } from "@hheinsoee/utility";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Loading } from "@components/Loading";
import { ColumnProps, ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";

interface MasterTableProps {
  title?: string;
  dataSource: any[];
  totalCount?: number | 0;
  newLoad?: (params?: any) => void;
  loading?: boolean;
  showColums?: string[];
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  extra?: React.ReactNode | React.ReactNode[];
  columns?: ColumnsType;
  loadingRow?: any;
  scroll?: any;
}

// interface ColumnProps<T> {
//   key?: string;
//   title: React.ReactNode;
//   dataIndex: keyof T | string;
//   sorter?: boolean | ((a: T, b: T) => number);
//   render?: (text: any, record: T, index: number) => React.ReactNode;
//   ellipsis?: boolean
// }

function MasterTable({
  title,
  dataSource,
  totalCount,
  newLoad,
  loading,
  showColums,
  onEdit,
  onDelete,
  extra,
  columns,
  loadingRow,
  scroll,
}: MasterTableProps) {
  const handleChange = (pagination?: any, filters?: any, sorter?: any) => {
    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    var params: any = {
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? offset : 0,
    };
    if (sorter?.hasOwnProperty("column")) {
      params = {
        ...params,
        ...(sorter.order && {
          orderBy: {
            [sorter.field]: sorter.order?.slice(0, -3),
          },
        }),
      };
    }

    newLoad && newLoad(params);
  };
  useEffect(() => {
    handleChange({
      current: 1,
      pageSize: 10,
    });
  }, []);

  const dynamicColumns = useMemo(() => {
    if (dataSource && dataSource.length > 0) {
      if (showColums) {
        return showColums.map((key) => {
          return {
            key,
            title: snakeToTitleCase(key),
            dataIndex: key,
            sorter: (a: number, b: number) => 0,
          };
        });
      } else {
        return Object.entries(dataSource[0]).map(([key]) => {
          return {
            key,
            title: snakeToTitleCase(key),
            dataIndex: key,
            sorter: (a: number, b: number) => 0,
          };
        });
      }
    } else {
      return [];
    }
  }, [dataSource, showColums]);
  const actionColumn = {
    title: "",
    key: "action",
    align: "right",
    dataIndex: "action",
    fixed: "right",
    render: (_: any, record: any) => (
      // <Dropdown
      //   menu={{
      //     items: [
      //       {
      //         key: "edit",
      //         label: (
      //           <span onClick={() => onEdit && onEdit(record)}>Edit</span>
      //         ),
      //       },
      //     ],
      //   }}
      // >
      //   <Button icon={<MoreOutlined />} type="text" />
      // </Dropdown>
      <Space size="small" className="opacity-30 hover:opacity-100">
        {onEdit && (
          <Button
            type="text"
            icon={<FaEdit />}
            onClick={() => onEdit && onEdit(record)}
          />
        )}
        {onDelete && (
          <Popconfirm
            title={`Delete this ${title}`}
            description={`Are you sure to delete this ${title}?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete && onDelete(record)}
          >
            <Button type="text" danger icon={<FaTrash />} />
          </Popconfirm>
        )}
      </Space>
    ),
  } as ColumnProps<any>;
  return (
    <Table
      style={{ width: "100%" }}
      scroll={scroll}
      title={() => (
        <Flex justify="space-between" gap={16}>
          {title ? <h2 className="m-0 text-2xl">{title}</h2> : <span />}

          <Flex gap={16}>{extra}</Flex>
        </Flex>
      )}
      loading={loading && { indicator: <Loading /> }}
      rowKey="key"
      onChange={newLoad && handleChange}
      pagination={{
        total: totalCount,
      }}
      dataSource={dataSource}
      columns={[
        ...(columns ? columns : dynamicColumns),
        ...(onDelete || onEdit ? [actionColumn] : []),
      ]}
    />
  );
}

export default MasterTable;
