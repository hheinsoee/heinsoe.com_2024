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
  onChange?: (img: ImageProps[]) => void;
  limit?: number;
  onUploading?: (isUploading: boolean) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const images: UploadFile[] = useMemo(
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
    if (fileList.length === 0 && images.length > 0) {
      setFileList(images);
    }
  }, [images, fileList.length]);

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
                fileName: myLink.image(img.response?.fileName, "m") || "",
              };
            } else {
              return img;
            }
          })
      );
    }
  };

  const UploadButton = () => (
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
      <div className="min-h-36 min-w-36">
        <Upload
          accept="image/png, image/jpeg, image/webp"
          action={adminLink.api.upload()}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple
          className="py-4"
        >
          {fileList.length < limit && <UploadButton />}
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
          // style={{ height: 10 }}
          src={previewImage}
          alt=""
        />
      )}
      {/* <JsonView data={images} /> */}
    </>
  );
};

export default ImageUpload;
