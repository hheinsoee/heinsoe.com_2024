"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRepo } from "../_private/context/repo";
import { JSONTree } from "react-json-tree";
import { getContent } from "@adminService/content";
import { message } from "antd";

function Page({ params }) {
  const { type_name } = params;
  const { type } = useRepo();
  const theType = type.find((t) => t.name == type_name);
  const [content, setContent] = useState([]);
  const loadData = async (type_id) => {
    try {
      setContent(await getContent({type_id}));
    } catch (error) {
      message.error(error?.message||'sth wrong')
    }
  };
  useEffect(() => {
    loadData(theType.id);
  }, [theType]);
  return (
    <div>
      <h2>{theType.name}</h2>
      <p>{theType.description}</p>
      <JSONTree data={content} />
    </div>
  );
}

export default Page;
