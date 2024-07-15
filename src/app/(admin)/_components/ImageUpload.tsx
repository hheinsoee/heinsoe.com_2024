"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { MdPhoto } from "react-icons/md";
import { adminLink } from "@admin/_private/adminLink";
import { Image as ImageProps } from "@prisma/client";
import myLink from "@/link";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({
  value = [],
  onChange,
  limit = 10,
  onUploading,
}: {
  value?: ImageProps[];
  onChange?: (imgs: ImageProps[]) => void;
  limit?: number;
  onUploading?: (isUploading: boolean) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const imagess: UploadFile[] = useMemo(
    () =>
      (value
        ? value?.map((img, i) => ({
            ...img,
            uid: `${img.id}${i}`,
            name: img.caption || " ",
            status: "done",
            url: myLink.image(img.fileName),
          }))
        : []) || [],
    [value]
  );

  useEffect(() => {
    if (fileList.length === 0 && imagess.length > 0) {
      setFileList(imagess);
    }
  }, [imagess, fileList.length]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
    if (onChange) {
      // const images: ImageProps[] =
      onChange(
        fileList
          .filter((img: any) => img.status === "done")
          .map((img: any) => {
            if (img.response) {
              return {
                id: img.response?.id,
                caption: img.response?.caption || "",
                fileName: img.response?.fileName || "",
              };
            } else {
              return img;
            }
          })
      );
    }
  };

  const uploadButton = (
    <div>
      <MdPhoto className="text-2xl" />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (onUploading) {
      onUploading(fileList.some((f) => f.status === "uploading"));
    }
  }, [fileList]);
  return (
    <>
      <div className="min-h-32">
        <Upload
          accept="image/png, image/jpeg"
          action={adminLink.api.upload()}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple
        >
          {fileList.length < limit && uploadButton}
        </Upload>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          style={{ height: 20 }}
          src={previewImage}
          alt=""
        />
      )}
      {/* <JsonView data={imagess} /> */}
    </>
  );
};

export default ImageUpload;
