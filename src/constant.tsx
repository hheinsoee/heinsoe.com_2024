import { JavaScriptOutlined } from "@ant-design/icons";
import React from "react";
import {
  FaCss3,
  FaDatabase,
  FaHtml5,
  FaJs,
  FaNode,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

interface Technology {
  label: string;
  Icon: React.FC<{ className?: string | "" }>;
}

export const technology: Record<string, Technology> = {
  nodejs: {
    label: "Node.js",
    Icon: (props: { className?: string }) => (
      <FaNodeJs
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  nextjs: {
    label: "NextJs",
    Icon: (props: { className?: string }) => (
      <TbBrandNextjs
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  expressjs: {
    label: "Express.js",
    Icon: (props: { className?: string }) => (
      <div
        className={`inline-block ${props?.className} flex justify-center items-center`} style={{marginTop:'-4px'}}
      >ex</div>
    ),
  },
  reactjs: {
    label: "ReactJs",
    Icon: (props: { className?: string }) => (
      <FaReact
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  reactnative: {
    label: "ReactNative",
    Icon: (props: { className?: string }) => (
      <FaReact
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  javascript: {
    label: "Javascript",
    Icon: (props: { className?: string }) => (
      <FaJs
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  typescript: {
    label: "TypeScript",
    Icon: (props: { className?: string }) => (
      <SiTypescript
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  graphql: {
    label: "GraphQL",
    Icon: (props: { className?: string }) => (
      <GrGraphQl
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  php: {
    label: "PHP",
    Icon: (props: { className?: string }) => (
      <FaPhp
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  sql: {
    label: "SQL",
    Icon: (props: { className?: string }) => (
      <FaDatabase
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  html: {
    label: "HTML",
    Icon: (props: { className?: string }) => (
      <FaHtml5
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  css: {
    label: "CSS",
    Icon: (props: { className?: string }) => (
      <FaCss3
        className={`${props?.className}`}
        // style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
};
