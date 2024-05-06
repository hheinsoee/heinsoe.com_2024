"use client";
import React, { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";
import { getContent } from "@adminService/content";
import { Col, Row, message } from "antd";
import ContentForm from "./ContentForm";
import dayjs from "dayjs";
import { makeFresh } from "@hheinsoee/utility";
import { Loading } from "@/components/loading";
// function makeFresh({ old, fresh }) {
//   const freshData = Array.isArray(fresh) ? fresh : [fresh];

//   const updatedData = [...old]; // Create a copy of the old array to avoid mutation

//   freshData.forEach((f) => {
//     const index = updatedData.findIndex((x) => x.id === f.id);
//     if (index !== -1) {
//       updatedData[index] = f; // Replace existing object with fresh object
//     } else {
//       updatedData.unshift(f); // Append fresh object to the beginning of the array
//     }
//   });
//   return updatedData;
// }

function Archive({ type }) {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const loadContent = (type_id) => {
    setLoading(true);
    getContent({
      where: {
        t_content_id: type_id,
      },
    })
      .then((data) => {
        setContent(data);
      })
      .catch((error) => {
        message.error(error?.message || "sth wrong");
      })
      .finally(() => {
        setLoading(false);
      });
    // try {
    //   setContent(
    //     await getContent({
    //       where: {
    //         t_content_id: type_id,
    //       },
    //     })
    //   );
    // } catch (error) {
    //   message.error(error?.message || "sth wrong");
    // }
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
        {loading ? (
          <Loading />
        ) : (
          content?.map((c) => (
            <div key={c.id} onClick={() => setSelected(c)} className="my-8">
              <div>{c.title}</div>
              <div>{dayjs(c.create_time).format("YYYY-MM-DD")}</div>
              <div>{c.description}</div>
              <div>{c.body}</div>
            </div>
          ))
        )}
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
