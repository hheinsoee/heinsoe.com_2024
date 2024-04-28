"use client";
import React, { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";
import { getContent } from "@adminService/content";
import { Col, Row, message } from "antd";
import ContentForm from "./ContentForm";
import dayjs from "dayjs";
import { makeFresh } from "@hheinsoee/utility";

function Archive({ type }) {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState();
  const loadContent = async (type_id) => {
    try {
      setContent(await getContent({ type_id }));
    } catch (error) {
      message.error(error?.message || "sth wrong");
    }
  };

  useEffect(() => {
    loadContent(type.id);
  }, [type]);

  const setFreshData = (data) => {
    setContent(makeFresh({ old: content, fresh: data }));
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={8} className="max-w-3xl mx-auto">
        <h2>{type.name}</h2>
        <p>{type.description}</p>
        {/* <JSONTree data={content} /> */}
        {content?.map((c) => (
          <div key={c.id} onClick={() => setSelected(c)}>
            <div>{c.title}</div>
            <div>{dayjs(c.create_time).format("YYYY-MM-DD")}</div>
            <div>{c.description}</div>
            <div>{c.body}</div>
          </div>
        ))}
      </Col>
      <Col span={16}>
        <ContentForm
          type={type}
          selected={selected}
          setSelected={setSelected}
          setFreshData={setFreshData}
        />
      </Col>
    </Row>
  );
}

export default Archive;
