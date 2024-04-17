"use client";
import { Button, Popconfirm, Table, Upload, message } from "antd";
import AdminLayout from "@adminComponent/adminLayout";
import { BiPlus } from "react-icons/bi";
import { InputElement } from "@adminComponent/form/inputElements";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { APP } from "@/constant";
import { DeleteOutlined, EditOutlined, InboxOutlined, Loading3QuartersOutlined, ReloadOutlined, RestFilled, RestOutlined } from "@ant-design/icons";
import { useRayFetch } from "@/app/(admin)/utility/useRayFetch";
import { Loading } from "@/components/loading";
import { JSONTree } from "react-json-tree";
import { _revalidatePath, _revalidateTags } from "@/app/(admin)/utility/serverActions"
import { contentType } from "@/app/contentSetting";
import Error from "next/error";
import { Result } from 'antd';
import Link from "next/link";

export default function Products({ params }) {
  const type = contentType.find(x => x.name == params.type_name)

  if (type) {
    return ThePage(type)
  } else {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link href={'/admin'} type="primary" className="px-4 py-2 bg-orange-500 rounded-lg">Back Home</Link>}
    />
  }
}
const ThePage = (type) => {
  const [formData, setFormData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState(null);


  const {
    loading,
    error,
    data: dataSource,
    getData,
    removeData,
    addData,
    updateData,
  } = useRayFetch({ url: `${APP.API.Content}/${type.name}` });

  const {
    loading: loading_,
    error: err_,
    data: generalData,
    getData: getGeneral,
  } = useRayFetch({ url: APP.API.General });

  useEffect(() => {
    getData();
    getGeneral();
    resetForm();
  }, []);
  
  const handleInputChange = (name, value) => {
    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      }
    }
    );
  };
  const handleInputFielaChange = (name, value) => {
    setFormData((old) => {
      old = old || {};
      return { ...old, fields: { ...old.fields, [name]: value } };
    });
  };

  const dynamicFields = type.field_list || []

  const fields = [
    { name: "title", label: `${type.name} title`, data_type: "text", required: true },
    { name: "category_ids", label: 'Categories' },
    { name: "body", label: "Content Detail", data_type: "textarea" },
  ];
  const fieldRight = [
    { name: "img_url", label: "Image", data_type: "image" },
    { name: "description", data_type: "textarea" },
  ];

  const theId = formData.id;
  const resetForm = useCallback(() => {
    setFormData({ type: type.name });
  }, [type.name]);

  const submit = async (e) => {
    var urlAdd = APP.API.Content;
    var urlUpdate = `${APP.API.Content}/${formData.id}`;
    e.preventDefault();
    theId && setLoadingRowId(formData.id);
    setLoadingSubmit(true);
    axios({
      method: theId ? "put" : "post",
      url: theId ? urlUpdate : urlAdd,
      data: formData,
    })
      .then(function (response) {
        console.log("response", response.data)
        messageApi.open({
          type: "success",
          content: `${response.data.title} has been ${theId ? "updated" : "added"
            }`,
        });
        if (theId) {
          updateData(response.data)
          _revalidateTags(type.name)
          _revalidatePath(`${APP.API.Content}/${type.name}/${theId}`)
        } else {
          addData(response.data)
          _revalidateTags(type.name)
        }
        resetForm()
      })
      .catch(function (error) {
        console.log(error);
        messageApi.open({
          type: "error",
          content: error.response.data.message || error.message,
        });
      })
      .finally(function () {
        setLoadingRowId(null);
        setLoadingSubmit(false);
      });
  };
  const handleDelete = (id) => {
    setLoadingRowId(id);
    setLoadingSubmit(true);
    axios
      .delete(`${APP.API.Content}/${id}`)
      .then(function (response) {
        removeData(id);
        resetForm()
        _revalidateTags(type.name)
        _revalidatePath(`${APP.API.Content}/${type.name}/${theId}`)
        messageApi.open({
          type: "success",
          content: "deleted successfully",
        });
      })
      .catch(function (error) {
        messageApi.open({
          type: "error",
          content: error.response.data.message || error.message,
        });
      })
      .finally(function () {
        setLoadingSubmit(false);
        setLoadingRowId(null);
      });
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      width: '80px',
      dataIndex: "id",
      sorter: (record1, record2) => {
        return record1.id < record2.id;
      },
    },
    {
      key: "2",
      title: "Title",
      width: '200px',
      dataIndex: "title",
      render: (text, record, index) => {
        return (<div className="line-clamp-2">{text}</div>)
      }
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        return (<div className="line-clamp-2">{text}</div>)
      }
    },
    {
      key: "5",
      title: "Actions",
      render: (text, record, index) => {
        return (
          <>
            <Button
              icon={<EditOutlined />}
              shape="circle"
              htmlType="submit"
              size="small"
              // ghost
              type="outline"
              onClick={() => setFormData(record)}
            />

            <Popconfirm
              title="Are you sure you want to delete this item?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                htmlType="submit"
                size="small"
                type="link"
                danger
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      {/* <JSONTree data={{ formData }} /> */}
      <AdminLayout
        leftSide={
          <div className="bg-white min-h-screen">{
            loading_ || !type ? (
              <Loading />
            ) : (
              generalData && (
                <form
                  onSubmit={submit}
                >
                  <div className="flex gap-4 sticky top-0 shadow p-4 bg-white z-10">
                    <h2 className="flex-1 m-0 capitalize">
                      {loading_ || !type
                        ? <Loading/>
                        : `${formData.id ? "Update" : "Add"} ${type?.name}`}
                    </h2>
                    <Button
                      key={"key"}
                      icon={<ReloadOutlined />}
                      onClick={resetForm}
                      type="success"
                    >
                      {" "}
                      Reset
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadingSubmit}
                    >
                      {formData.id ? "Update" : "Add"}
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        {fields.map((f, i) => {
                          return (
                            <div className="mb-4" key={i}>
                              <small className=" capitalize">{f.label || f.name}</small>
                              <InputElement
                                value={formData[f.name]}
                                onChange={(v) => handleInputChange(f.name, v)}
                                field={f}
                                generalData={generalData}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        {fieldRight.map((f, i) => {
                          return (
                            <div className="mb-4" key={i}>
                              <small className=" capitalize">{f.label || f.name}</small>
                              <InputElement
                                value={formData[f.name]}
                                onChange={(v) => handleInputChange(f.name, v)}
                                field={f}
                                generalData={generalData}
                              />
                            </div>
                          );
                        })}
                        {loading_ || !type
                          ? <Loading />
                          : dynamicFields &&
                          dynamicFields.map((f, i) => {
                            return (
                              <div className="mb-4" key={i}>
                                <small className=" capitalize">{f.label || f.name}</small>
                                <InputElement
                                  value={formData.fields?.[f.name]}
                                  onChange={(v) =>
                                    handleInputFielaChange(f.name, v)
                                  }
                                  field={f}
                                  generalData={generalData}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </form>
              )
            )}</div>
        }
        rightSide={

          <div className="bg-white min-h-screen">
            {/* <JSONTree data={dataSource}/> */}
            <Table
              rowKey={(record) => record.id}
              title={() => <h2 className="h=[100px] m-0 capitalize">{loading_ || !type ? "loading.." : `${type?.name} list`}</h2>}
              rowClassName={(record, index) =>
                `${record.id == loadingRowId ? " animate-pulse cursor-progress " : ""
                }
                ${record.id == theId && 'text-orange-600'}`
              }
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => { setFormData(record) }, // click row
                  onDoubleClick: (event) => { setFormData(record) }, // double click row
                  onContextMenu: (event) => {
                    event.preventDefault();
                    setFormData(record);
                  }, // right button click row
                  // onMouseEnter: (event) => {}, // mouse enter row
                  // onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
              scroll={{ y: 'calc(100vh - 100px)' }}
              bordered={false}
              className="bg-white rounded-none"
              dataSource={dataSource}
              columns={columns}
              loading={loading}
              pagination={{
                pageSize: 10,
              }}
            ></Table>
          </div>
        }
      />
    </>
  );
}
