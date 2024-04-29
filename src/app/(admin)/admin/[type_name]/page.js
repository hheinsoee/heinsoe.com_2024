"use client";
import React from "react";
import { useRepo } from "../_private/context/repo";
import Archive from "./_component.js/Archive";
import { notFound } from "next/navigation";

function Page({ params }) {
  const { type_name } = params;
  const [{ ls_type }] = useRepo();
  const theType = ls_type.find((t) => t.name == type_name);
  if (theType) {
    return (
      <div>
        <Archive type={theType} />
      </div>
    );
  } else {
    notFound();
  }
}

export default Page;
