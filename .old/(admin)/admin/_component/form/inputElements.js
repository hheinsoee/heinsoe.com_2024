"use client";
import {
  AndroidFilled,
  AppleFilled,
  UploadOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Space,
  Tooltip,
  Upload,
  message,
} from "antd";
import { useRayFetch } from "@/app/(admin)/utility/useRayFetch";
import { APP } from "@/constant";
import { useEffect } from "react";
import { BsBrowserChrome } from "react-icons/bs";
import InputPhoto from "@adminComponent/form/uploadPhot";
import dayjs from "dayjs";
import { MdImage, MdImageAspectRatio } from "react-icons/md";
import dynamic from "next/dynamic";

const MyCkEditor = dynamic(() => import("./MyCkEditor"), { ssr: false });

export function InputElement({ onChange, value, field, generalData }) {
  const placeholder = field.label || field.name;
  const required = field.required;
  const { TextArea } = Input;
  const {
    loading,
    error,
    data: clients,
    getData,
  } = useRayFetch({ url: `${APP.API.Content}/client` });

  useEffect(() => {
    if (field.name == "client_ids") {
      getData();
    }
  }, [field]);

  switch (field.name) {
    case "os":
      return (
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder={field.label}
          // defaultValue={[]}
          value={value ? value.split(`,`) : []}
          //onChange={(e)=>onchange(e.target.value)}
          onChange={(v) => onChange(v.join(","))}
          optionLabelProp="label"
          loading={loading}
          options={[
            { value: "android", label: "android", icon: <AndroidFilled /> },
            { value: "ios", label: "ios", icon: <AppleFilled /> },
            { value: "window", label: "window", icon: <WindowsFilled /> },
            { value: "web", label: "web", icon: <BsBrowserChrome /> },
          ]}
          optionRender={(option) => (
            <Space>
              {option.data.icon}
              <span>{option.data.label}</span>
            </Space>
          )}
        />
      );

    case "client_ids":
      return (
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder={field.label}
          // defaultValue={[]}
          value={
            value
              ? typeof value == "number"
                ? value
                : value.split(`,`).map((n) => parseInt(n))
              : []
          }
          onChange={(v) => onChange(v.join(","))}
          optionLabelProp="label"
          loading={loading}
          options={
            clients
              ? clients.map((x) => {
                  return {
                    value: x.id,
                    label: x.title,
                    ...x,
                  };
                })
              : []
          }
          optionRender={(option) => (
            <Space>
              <img
                alt={option.data.title}
                src={option.data.img_url}
                className="w-16 h-8 object-contain object-left"
              />
              <span>{option.data.title}</span>
            </Space>
          )}
        />
      );

    case "category_ids":
      return (
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder={field.label}
          // defaultValue={[]}
          value={value || []}
          onChange={onChange}
          optionLabelProp="label"
          loading={loading}
          options={
            generalData.category
              ? generalData.category.map((x) => {
                  return {
                    value: x.id,
                    label: x.name,
                    ...x,
                  };
                })
              : []
          }
          optionRender={(option) => (
            <Tooltip title={option.data.description}>
              <span>{option.data.name}</span>
            </Tooltip>
          )}
        />
      );

    case "body":
      return <MyCkEditor value={value} onChange={onChange} />;
    // <textarea onChange={(e)=>onChange(e.target.value)}>{value}</textarea>

    // return <QuillEditor value={value} setValue={onChange} />;
    // return <TheEditor defaultHtml={value} setTheHtml={onChange} />;
    default:
      switch (field.data_type) {
        case "textarea":
          return (
            <TextArea
              onChange={(e) => onChange(e.target.value)}
              value={value}
              placeholder={placeholder}
              autoSize
              required={required}
            />
          );
        case "image":
          return (
            <InputPhoto value={value} onChange={onChange} isSingle={true}>
              <div className="w-32 h-32 rounded-md overflow-hidden cursor-pointer">
                {value ? (
                  <img
                    src={value}
                    alt="change image"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div
                    alt="upload image"
                    className="w-full h-full object-cover object-center flex justify-center items-center bg-gray-500/10"
                  >
                    <MdImage />
                  </div>
                )}
              </div>
            </InputPhoto>
          );
        case "number":
          return (
            <InputNumber
              className="block w-full"
              value={value}
              onChange={(val) => onChange(val)}
              placeholder={placeholder}
              required={required}
            />
          );
        default:
          return (
            <Input
              onChange={(e) => onChange(e.target.value)}
              value={value}
              type={field.data_type}
              placeholder={placeholder}
              required={required}
            />
          );
      }
  }
}
