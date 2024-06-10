"use client";
import React, { useState } from "react";
import { MdCatalog, MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Button, Drawer, Flex } from "antd";
import { FaEdit } from "react-icons/fa";
import { JSONTree } from "react-json-tree";
import { useTheme } from "@/context/theme";
const previewTheme = "default";

export const MarkDownEditor = ({
  onChange,
  value,
  onError,
}: {
  onChange: any;
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
          onChange={onChange}
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
