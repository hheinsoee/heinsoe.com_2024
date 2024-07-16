"use client";
import { createTech, getTech, updateTech } from "@/service";
import { Tech } from "@interface";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  List,
  message,
  Modal,
  Row,
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

function Page() {
  const [selected, setSelected] = useState<Tech | null>(null);
  const [tech, setTech] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingRow, setLoadingRow] = useState<Tech | null>(null);
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
    <List loading={loading}>
      {tech.map((t) => (
        <List.Item key={t.id}>
          <TheForm
            selected={t}
            onFresh={(freshTech) => {
              setTech((tech) =>
                makeFresh({
                  old: tech,
                  fresh: freshTech,
                })
              );
            }}
          />
        </List.Item>
      ))}
      <List.Item>
        <TheForm
          onFresh={(freshTech) => {
            setTech((tech) =>
              makeFresh({
                old: tech,
                fresh: freshTech,
              })
            );
          }}
        />
      </List.Item>
    </List>
  );
}

export default Page;

const TheForm = ({
  selected,
  onFresh,
}: {
  selected?: Tech;
  onFresh: (data: Tech) => void;
}) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState<string | null>(null);
  const change = selected?.name !== current;

  useEffect(() => {
    reset();
  }, [form, selected]);
  const reset = () => {
    if (selected) {
      setCurrent(selected.name);
      form.setFieldsValue(selected);
    } else {
      setCurrent(null);
      form.resetFields();
    }
  };
  const onFinish = async (values: any) => {
    if (selected?.id) {
      await updateTech({
        where: {
          id: selected?.id,
        },
        data: values,
      })
        .then(({ data }) => {
          console.log(data);
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
      <Space.Compact style={{ width: "100%" }}>
        <Form.Item className="m-0" name={"name"} rules={[{ required: true }]}>
          <Input
            variant={change ? undefined : "borderless"}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </Form.Item>
        {change && [
          <Button key={"reset"} onClick={reset} icon={<BiRefresh />} />,
          <Button key={"save"} htmlType="submit">
            Save
          </Button>,
        ]}
      </Space.Compact>
    </Form>
  );
};
