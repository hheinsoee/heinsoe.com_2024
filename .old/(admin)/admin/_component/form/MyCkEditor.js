"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { APP } from "@/constant";
import InputPhoto from "./uploadPhot";
import { MdImage } from "react-icons/md";

export const MyCkEditor = ({ value, onChange }) => {
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "color",
      // "insertImage",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "|",
      "codeBlock",
    ],
    mediaEmbed: {
      previewsInData: true,
    },
    image: {
      styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
      toolbar: [
        "imageStyle:full",
        "imageStyle:side",
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
      ],
    },
    oembed: {
      styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
      toolbar: [
        "imageStyle:full",
        "imageStyle:side",
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
      ],
    },
  };

  const handleImageInsert = (imageUrl) => {
    const editor = window.editor;
    console.log(editor);
    editor.execute("imageInsert", {
      source: imageUrl,
    });
  };

  return (
    <div>
      <InputPhoto
        // value={value}
        onChange={(v) => handleImageInsert(v)}
        isSingle={true}
      >
        <div>
          Image Gallery
          <MdImage />
        </div>
      </InputPhoto>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={value || ""}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onReady={(editor) => {
          window.editor = editor;
          // editor.plugins.get("FileRepository").createUploadAdapter = (
          //   loader
          // ) => {
          //   return new CustomUploadAdapter(loader, uploadUrl);
          // };
        }}
      />
    </div>
  );
};

export default MyCkEditor;

export class CustomUploadAdapter {
  constructor(loader, uploadUrl) {
    this.loader = loader;
    this.uploadUrl = uploadUrl;
  }

  upload() {
    return {
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pisA5EwTtmudjfczduX8zEuu0knq9ZYTLPxzKZLJUg&s",
    };
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const file = await this.loader.file;

    //     const formData = new FormData();
    //     formData.append("img_url", file);

    //     const response = await axios.post(this.uploadUrl, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     const responseData = response.data;

    //     if (response.status === 200 && responseData && responseData.url) {
    //       resolve({ default: responseData.url });
    //     } else {
    //       reject("Invalid server response");
    //     }
    //   } catch (error) {
    //     reject(`Upload failed: ${error}`);
    //   }
    // });
  }

  abort() {
    // Implement the abort process if needed
  }
}
