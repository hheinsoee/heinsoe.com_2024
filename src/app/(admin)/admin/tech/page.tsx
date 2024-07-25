"use client";
import { createTech, getTech, updateTech } from "@/service";
import { Tech } from "@interface";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  List,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import MasterTable from "../../_components/MasterTable";
import { makeFresh } from "@hheinsoee/utility";
import ImageUpload from "../../_components/ImageUpload";
import { MarkDownEditor, MarkDownView } from "../../_components/Inputs";
import { JsonView } from "react-json-view-lite";
import dayjs from "dayjs";
import conf from "@config";
import myLink from "@/link";
import { Loading } from "@/components/Loading";
import { BiRefresh } from "react-icons/bi";
import { useRepo } from "@/context/repo";
import { ImImage } from "react-icons/im";
import { CloseOutlined } from "@ant-design/icons";

function Page() {
  const [selected, setSelected] = useState<Tech | null>(null);
  const [tech, setTech] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { repo, setRepo } = useRepo();
  const fetchData = async (params?: any | null) => {
    setLoading(true);
    await getTech(params)
      .then(({ data, pagination }) => {
        setTotal(pagination.total);
        setTech(data);
      })
      .catch((err) => {
        message.error("not loaded");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRepo((o: any) => ({ ...o, techs: { data: tech } }));
  }, [tech]);
  return (
    <div>
      <TheForm
        selected={selected || undefined}
        setSelected={setSelected}
        onFresh={(freshTech) => {
          setTech((tech) =>
            makeFresh({
              old: tech,
              fresh: freshTech,
            })
          );
        }}
      />
      <Divider />
      <div className="flex flex-wrap gap-4">
        {loading && (
          <React.Fragment>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton.Image key={index} />
            ))}
          </React.Fragment>
        )}
        {tech.map((t) => (
          <div
            onClick={() => setSelected(t)}
            key={t.id}
            className="flex flex-col items-center text-center "
          >
            {t.image ? (
              <img
                className="h-24"
                src={myLink.image(t.image?.fileName, "m")}
                alt=""
              />
            ) : (
              <div className="flex justify-center items-center">
                <Skeleton.Image />
              </div>
            )}
            {t.name}
          </div>
        ))}
      </div>
    </div>
    // <List loading={loading}>
    //   {tech.map((t) => (
    //     <List.Item key={t.id}>
    //       <TheForm
    //         selected={t}
    //         onFresh={(freshTech) => {
    //           setTech((tech) =>
    //             makeFresh({
    //               old: tech,
    //               fresh: freshTech,
    //             })
    //           );
    //         }}
    //       />
    //     </List.Item>
    //   ))}
    //   <List.Item>
    //     <TheForm
    //       onFresh={(freshTech) => {
    //         setTech((tech) =>
    //           makeFresh({
    //             old: tech,
    //             fresh: freshTech,
    //           })
    //         );
    //       }}
    //     />
    //   </List.Item>
    // </List>
  );
}

export default Page;

const TheForm = ({
  selected,
  onFresh,
  setSelected,
}: {
  selected?: Tech;
  onFresh: (data: Tech) => void;
  setSelected: React.Dispatch<React.SetStateAction<Tech | null>>;
}) => {
  const [form] = Form.useForm();

  const reset = (d?: Tech) => {
    form.resetFields();
    if (d) {
      form.setFieldsValue({ ...d, images: d.image ? [d.image] : [] });
    }
  };
  useEffect(() => {
    reset(selected);
  }, [form, selected]);

  const onFinish = async (values: any) => {
    if (values.images?.length > 0) {
      values.imageId = values.images[0].id;
    }
    values.images = undefined;
    if (selected?.id) {
      await updateTech({
        where: {
          id: selected?.id,
        },
        data: values,
      })
        .then(({ data }) => {
          onFresh(data[0]);
          message.success("updated");
        })
        .catch((err) => {
          message.error("not Updated");
        })
        .finally(() => {});
    } else {
      await createTech(values)
        .then(({ data }) => {
          onFresh(data[0]);
          message.success("created");
          form.resetFields();
        })
        .catch((error) => message.error("not created"))
        .finally(() => {});
    }
  };
  const [lockSubmit, setLockSubmit] = useState(false);
  return (
    <Form
      name="tech"
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div className="flex">
        <Form.Item
          className="m-0"
          name={"images"}
          rules={[{ required: !lockSubmit && true }]}
        >
          <ImageUpload limit={1} onUploading={setLockSubmit} />
        </Form.Item>
        <div className="py-4">
          <Form.Item name={"name"} rules={[{ required: true }]}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item>
            <Space.Compact style={{ width: "100%" }}>
              <Button
                key={"clear"}
                onClick={() => setSelected(null)}
                icon={<CloseOutlined />}
              >
                Reset
              </Button>
              <Button
                key={"reset"}
                onClick={() => reset(selected)}
                icon={<BiRefresh />}
              >
                Restore
              </Button>
              <Button
                type="primary"
                key={"save"}
                htmlType="submit"
                disabled={lockSubmit}
              >
                {selected ? "Update" : "Create"}
              </Button>
            </Space.Compact>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
