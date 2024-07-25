import React from "react";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
// import { og } from "./layout";
import ScrollNotes from "./_components/archive";

export default function Page() {
  return (
    <>
      {/* <Header
        title={og.title}
        extra={
          <ActionBar
            title={og.title}
            text={og.description}
            url={og.url}
          />
        }
      /> */}
      <ScrollNotes />
    </>
  );
}
