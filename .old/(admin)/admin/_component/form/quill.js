"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

export function QuillEditor({ defaultValue, value, onChange }) {
  const quillRef = useRef();

  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), { ssr: false, forwardRef: true }),
    []
  );
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log({ editor });
    // const input = document.createElement("input");
    // input.setAttribute("type", "file");
    // input.setAttribute("accept", "image/*");
    // input.click();

    // input.onchange = async () => {
    //   const file = input.files[0];
    //   if (/^image\//.test(file.type)) {
    //     console.log(file);
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     console.log(formData);
    //     // const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
    //     // const url = res?.data?.url;
    //     // editor.insertEmbed(editor.getSelection(), "image", url);
    //   } else {
    //     console.error("err");
    //   }
    // };
  };

  var modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  var formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      {/* {value} */}
      <ReactQuill
        theme="snow"
        ref={quillRef}
        defaultValue={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{}}
      />
    </>
  );
}
