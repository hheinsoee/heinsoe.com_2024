"use client";
import { createNote, getNote, updateNote } from "@/service";
import { Note } from "@interface";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
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

function Page() {
  const [selected, setSelected] = useState<Note | null>(null);
  const [note, setNote] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingRow, setLoadingRow] = useState<Note | null>(null);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    if (selected) {
      setOpen(true);
      form.setFieldsValue({
        ...selected,
        images: selected.image ? [selected.image] : [],
      });
      console.log(selected);
    } else {
      setOpen(false);
      form.resetFields();
    }
  }, [form, selected]);
  const handleDelete = async (rec: Note) => {
    setLoadingRow(rec);
    await updateNote({
      where: {
        id: rec.id,
      },
      data: {
        isDeleted: true,
      },
    })
      .then((res) => {
        setNote((pre) => pre.filter((old) => old.id !== rec.id));
      })
      .catch((err) => {
        message.error("not Deleted");
      })
      .finally(() => {
        setLoadingRow(null);
      });
  };
  const fetchData = async (params?: any | null) => {
    setLoading(true);
    await getNote(params)
      .then(({ data, pagination }) => {
        setTotal(pagination.total);
        setNote(data);
      })
      .catch((err) => {
        message.error("not loaded");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = async (values: any) => {
    // console.log(values);
    // return;
    if (values.images?.length > 0) {
      values.imageId = values.images[0].id;
    }
    values.images = undefined;
    setLoadingSubmit(true);
    setLoadingRow(selected);
    if (selected?.id) {
      await updateNote({
        where: {
          id: selected?.id,
        },
        data: values,
      })
        .then(({ data }) => {
          message.success("updated");
          setSelected(null);
          setNote((old) => makeFresh({ old, fresh: data }));
          form.resetFields();
        })
        .catch((err) => {
          message.error("not Updated");
        })
        .finally(() => {
          setLoadingSubmit(false);
          setLoadingRow(null);
        });
    } else {
      await createNote(values)
        .then(({ data }) => {
          // console.log(fresh);
          message.success("created");
          setOpen(false);
          setNote((old) => makeFresh({ old, fresh: data }));
          form.resetFields();
        })
        .catch((error) => message.error("not created"))
        .finally(() => {
          setLoadingSubmit(false);
        });
    }
  };
  const [lockSubmit, setLockSubmit] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-8 px-8">
      <div className="">
        <MasterTable
          title="note"
          dataSource={note}
          onEdit={setSelected}
          onDelete={handleDelete}
          newLoad={fetchData}
          loading={loading}
          totalCount={total}
          scroll={{ y: "calc(100vh - 200px )" }}
          columns={[
            {
              title: "Image",
              dataIndex: "image",
              key: "image",
              render: (image) => {
                return (
                  <img
                    src={myLink.image(image?.fileName, "s")}
                    alt={image?.name}
                    width={60}
                  />
                );
              },
            },
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
              sorter: true,
            },
            // {
            //   title: "Description",
            //   dataIndex: "description",
            //   key: "description",
            //   ellipsis: true,
            //   render: (text) => <MarkDownView text={text} />,
            // },
            {
              title: "Created",
              dataIndex: "createdDt",
              key: "createdDt",
              sorter: true,
              render: (text) => dayjs(text).format(conf.dateTimeFormat),
            },
            {
              title: "Updated",
              dataIndex: "updatedDt",
              key: "updatedDt",
              sorter: true,
              render: (text) => dayjs(text).format(conf.dateTimeFormat),
            },
          ]}
        />
      </div>
      <div className="h-screen overflow-y-auto hideScroll">
        {/* <Drawer
        placement="bottom"
        height={"100vh"}
        open={!!selected}
        onClose={() => setSelected(null)}
        extra={
          <Button onClick={form.submit} type="primary">
            {selected?.id ? "Update" : "Create"}
          </Button>
        }
      > */}
        <Form
          name="note"
          key={selected?.id}
          layout="vertical"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Space.Compact className="sticky top-8 float-end z-10">
            <Button onClick={() => setSelected(null)}>clear</Button>
            <Button
              onClick={form.submit}
              type="primary"
              loading={loadingSubmit}
              disabled={lockSubmit}
            >
              {selected?.id ? "Update" : "Create"}
            </Button>
          </Space.Compact>
          <Form.Item label="Image" name={"images"}>
            <ImageUpload limit={1} onUploading={setLockSubmit} />
          </Form.Item>
          <Form.Item label="Title" name={"title"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="description"
            name={"description"}
            rules={[{ required: true }]}
          >
            <MarkDownEditor />
          </Form.Item>
          <Form.Item label="Body" name={"body"} rules={[{ required: true }]}>
            <MarkDownEditor />
          </Form.Item>
        </Form>
        {/* </Drawer> */}
      </div>
    </div>
  );
}

export default Page;
