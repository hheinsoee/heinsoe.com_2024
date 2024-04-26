"use client";
import React from "react";
import { useRepo } from "../_private/context/repo";
import { JSONTree } from "react-json-tree";

function Page({ params }) {
  const { type_name } = params;
  const { type } = useRepo();
  const theType = type.find((t) => t.name == type_name);
  return (
    <div>
      <h2>{theType.name}</h2>
      <p>{theType.description}</p>
      
    </div>
  );
}

export default Page;
