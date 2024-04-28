"use client";
import React from "react";
import { useRepo } from "../_private/context/repo";
import Archive from "./_component.js/Archive";

function Page({ params }) {
  const { type_name } = params;
  const [{ ls_type }] = useRepo();
  const theType = ls_type.find((t) => t.name == type_name);
  return (
    <div>
      <Archive type={theType} />
    </div>
  );
}

export default Page;
