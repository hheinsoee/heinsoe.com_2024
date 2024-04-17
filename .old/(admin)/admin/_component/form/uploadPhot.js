import React, { useEffect, useState } from "react";
import {
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, message, Modal, Spin, Upload } from "antd";
import { APP } from "@/constant";
import UploadPhoto from "./uploadPhoto";
import { useRayFetch } from "@/app/(admin)/utility/useRayFetch";
import { JSONTree } from "react-json-tree";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const InputPhoto = ({ value, onChange, children, isSingle }) => {
  const {
    loading,
    error,
    data: images,
    getData,
    addData,
  } = useRayFetch({ url: `${APP.API.Image}` });
  useEffect(() => {
    if (!images) {
      getData();
    }
  }, []);
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    if (value) {
      const dataArr = Array.isArray(value);
      setSelected(dataArr ? value : [value]);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onChange(isSingle ? selected[0] : selected);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected([]);
  };

  const handleSelect = (img) => {
    if (isSingle) {
      setSelected([img]);
    } else {
      const isExist = selected.map((x) => x).includes(img);
      if (isExist) {
        setSelected((pre) => pre.filter((x) => x !== img));
      } else {
        setSelected((pre) => [img, ...pre]);
      }
    }
  };
  return (
    <>
      {/* <JSONTree data={info} /> */}
      <div type="primary" onClick={showModal}>
        {children ? children : "btn"}
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="grid grid-cols-6 md:grid-cols-12 lg:grid-col-16">
          {selected.length > 0 &&
            selected.map((img) => (
              <div key={img}>
                <img
                  src={img}
                  className="w-full h-8 object-cover object-center"
                />
              </div>
            ))}
        </div>
        {/* <JSONTree data={images}/> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <UploadPhoto value={null} onChange={addData} />
          {images ? (
            images.map((img) => (
              <div
                key={img.url}
                onClick={() => handleSelect(img.url)}
                className="relative cursor-pointer"
              >
                {selected.map((x) => x).includes(img.url) && (
                  <div
                    key={img.url}
                    className="absolute w-full bg-orange-500/50 flex justify-center items-center h-full text-white"
                  >
                    <CheckOutlined />
                  </div>
                )}
                <img
                  src={img.url}
                  className="w-full h-24 object-cover object-center aspect-w-2 aspect-h-2"
                />
              </div>
            ))
          ) : (
            <Spin />
          )}
        </div>
      </Modal>
    </>
  );
};
export default InputPhoto;
