"use client";
import { createProject, getProject, updateProject } from "@/service";
import { Project } from "@interface";
import {
  Button,
  Col,
  DatePicker,
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
import {
  MarkDownEditor,
  MarkDownView,
  MyDatePicker,
  TagsPicker,
  TechsPicker,
} from "../../_components/Inputs";
import { JsonView } from "react-json-view-lite";
import dayjs from "dayjs";
import conf from "@config";
import { JSONTree } from "react-json-tree";
import { Prisma } from "@prisma/client";
import myLink from "@/link";
import Cell from "@/components/Cell";

function Page() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [project, setProject] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingRow, setLoadingRow] = useState<Project | null>(null);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (selected) {
      // setOpen(true);
      form.setFieldsValue({
        ...selected,
        images: selected.image ? [selected.image] : [],
        techIds: selected.techs?.map((t) => t.TechId),
        tagIds: selected.tags?.map((t) => t.TagId),
      });
      // console.log(selected);
    }
  }, [selected]);

  const handleDelete = async (rec: Project) => {
    setLoadingRow(rec);
    await updateProject({
      where: {
        id: rec.id,
      },
      data: {
        isDeleted: true,
      },
    })
      .then((res) => {
        setProject((pre) => pre.filter((old) => old.id !== rec.id));
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
    await getProject({
      ...params,
      include: {
        image: true,
        tags: {
          include: {
            Tag: true,
          },
        },
        techs: {
          include: {
            Tech: true,
          },
        },
      },
    })
      .then(({ data, pagination }) => {
        setTotal(pagination.total);
        setProject(data);
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
      const data: Prisma.ProjectUpdateInput = {
        ...values,
        tagIds: undefined,
        techIds: undefined,
        tags: {
          deleteMany: {
            ProjectId: selected.id,
          },
          createMany: {
            data: values.tagIds?.map((ids: number) => {
              return { TagId: ids };
            }),
          },
        },
        techs: {
          deleteMany: {
            ProjectId: selected.id,
          },
          createMany: {
            data: values.techIds?.map((ids: number) => {
              return { TechId: ids };
            }),
          },
        },
      };
      await updateProject({
        where: {
          id: selected?.id,
        },
        data,
      })
        .then(({ data }) => {
          message.success("updated");
          setSelected(null);
          setProject((old) => makeFresh({ old, fresh: data }));
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
      const data: Prisma.ProjectCreateInput = {
        ...values,
        tagIds: undefined,
        techIds: undefined,
        tags: {
          createMany: {
            data: values.tagIds?.map((ids: number) => {
              return { TagId: ids };
            }),
          },
        },
        techs: {
          createMany: {
            data: values.techIds?.map((ids: number) => {
              return { TechId: ids };
            }),
          },
        },
      };
      await createProject(data)
        .then(({ data }) => {
          message.success("created");
          setOpen(false);
          setProject((old) => makeFresh({ old, fresh: data }));
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
          title="project"
          dataSource={project}
          onEdit={setSelected}
          onDelete={handleDelete}
          newLoad={fetchData}
          loading={loading}
          totalCount={total}
          scroll={{ y: "calc(100vh - 200px )" }}
          columns={[
            {
              title: "Date",
              dataIndex: "date",
              key: "date",
              sorter: true,
              render: (text) => dayjs(text).format(conf.dateFormat),
            },
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
              render: (_, rec) => (
                <div>
                  {_}
                  {rec.techs.map((t: any) => (
                    <Cell
                      key={t?.TechId}
                      type="technology"
                      value={t?.Tech?.name}
                      className="mr-2 my-1"
                    />
                  ))}
                </div>
              ),
            },
            {
              key: "tags",
              dataIndex: "tags",
              title: "Tags",
              // ellipsis: true,
              // width: "500px",
              render: (_) => _.map((t: any) => t?.Tag?.name).join(", "),
            },
            // {
            //   title: "Description",
            //   dataIndex: "description",
            //   key: "description",
            //   ellipsis: true,
            //   render: (text) => <MarkDownView text={text} />,
            // },
            // {
            //   title: "Created",
            //   dataIndex: "createdDt",
            //   key: "createdDt",
            //   sorter: true,
            //   render: (text) => dayjs(text).format(conf.dateTimeFormat),
            // },
            // {
            //   title: "Updated",
            //   dataIndex: "updatedDt",
            //   key: "updatedDt",
            //   sorter: true,
            //   render: (text) => dayjs(text).format(conf.dateTimeFormat),
            // },
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
        {/* <JSONTree data={selected} /> */}
        <Form
          name="project"
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
          <Form.Item label="Tags" name={"tagIds"}>
            <TagsPicker />
          </Form.Item>

          <Form.Item label="Techs" name={"techIds"}>
            <TechsPicker />
          </Form.Item>
          <Form.Item label="Date" name={"date"} rules={[{ required: true }]}>
            <MyDatePicker />
          </Form.Item>

          <Form.Item label="URL" name={"url"} rules={[{ required: true }]}>
            <Input.TextArea />
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
