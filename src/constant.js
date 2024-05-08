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
import { TbBrandNextjs } from "react-icons/tb";

export const technology = {
  nodejs: {
    label: "Node.js",
    Icon: (props) => <FaNodeJs className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  nextjs: {
    label: "NextJs",
    Icon: (props) => <TbBrandNextjs className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  reactjs: {
    label: "ReactJs",
    Icon: (props) => <FaReact className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  reactnative: {
    label: "ReactNative",
    Icon: (props) => <FaReact className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  php: {
    label: "PHP",
    Icon: (props) => <FaPhp className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  sql: {
    label: "SQL",
    Icon: (props) => <FaDatabase className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  html: {
    label: "HTML",
    Icon: (props) => <FaHtml5 className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  css: {
    label: "CSS",
    Icon: (props) => <FaCss3 className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
  javascript: {
    label: "Javascript",
    Icon: (props) => <FaJs className={`${props?.className}`} style={{translate: '0px 2px',marginBottom:'2px'}}/>,
  },
};

export const me = {
  githubUsername: "hheinsoee",
  about:'as a web developer and designer committed to creating visually appealing and highly functional websites. With a focus on the latest trends and technologies, I strive to deliver exceptional web solutions that help businesses succeed online.'
};

export const setting = {
  dateFormat: "DD-MMM YYYY",
};
