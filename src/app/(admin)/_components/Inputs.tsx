"use client";
import React, { useState } from "react";
import { MdCatalog, MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Drawer,
  Flex,
  InputProps,
  Select,
  SelectProps,
} from "antd";
import { FaEdit } from "react-icons/fa";
import { JSONTree } from "react-json-tree";
import { useTheme } from "@/context/theme";
import dayjs from "dayjs";
import { useRepo } from "@/context/repo";
import { JsonView } from "react-json-view-lite";
import { Tag } from "@interface";
const previewTheme = "default";

export const MarkDownEditor = ({
  onChange,
  value,
  onError,
}: {
  onChange?: any;
  value?: any;
  onError?: Function;
}) => {
  const [open, setOpen] = useState(false);
  const isDark = useTheme()?.isDark;

  return (
    <div>
      {/* <JSONTree data={value} /> */}
      <div className={onError ? "ring ring-red-500" : ""}>
        <Flex justify="flex-end">
          <Button type="text" icon={<FaEdit />} onClick={() => setOpen(true)}>
            Edit
          </Button>
        </Flex>
        <MdPreview
          theme={isDark ? "dark" : "light"}
          language="en-US"
          previewTheme={previewTheme}
          modelValue={value || ""}
          style={{ background: "transparent" }}
          className="[&>*]:!p-0"
        />
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} width={"100%"}>
        <MdEditor
          language="en-US"
          theme={isDark ? "dark" : "light"}
          previewTheme={previewTheme}
          modelValue={value || ""}
          onChange={onChange && onChange}
        />
      </Drawer>
    </div>
  );
};

export const MarkDownView = ({ text }: { text: string }) => {
  const isDark = useTheme()?.isDark;
  return (
    <MdPreview
      theme={isDark ? "dark" : "light"}
      previewTheme={previewTheme}
      language="en-US"
      modelValue={text || ""}
      style={{ background: "transparent" }}
      className="[&>*]:!p-0"
    />
  );
};

export const MyDatePicker = (props: DatePickerProps) => {
  return <DatePicker value={dayjs(props.value)} onChange={props.onChange} />;
};
export const TagsPicker = (props: SelectProps) => {
  const { repo } = useRepo();
  const tags = repo?.tags?.data || [];
  return (
    <Select
    {...props}
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      // defaultValue={['a10', 'c12']}
      onChange={props.onChange}
      options={tags.map((t: Tag) => ({
        label: t.name,
        value: t.id,
      }))}
    />
  );
};
export const TechsPicker = (props: SelectProps) => {
  const { repo } = useRepo();
  const techs = repo?.techs?.data || [];
  return (
    <Select
      {...props}
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      // defaultValue={['a10', 'c12']}
      // value={props.value}
      onChange={props.onChange}
      options={techs.map((t: Tag) => ({
        label: t.name,
        value: t.id,
      }))}
    />
  );
};
