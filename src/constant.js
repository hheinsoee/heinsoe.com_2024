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
  node: {
    label: "Node.js",
    Icon: (props) => <FaNodeJs className={props?.className} />,
  },
  nextjs: {
    label: "NextJs",
    Icon: (props) => <TbBrandNextjs className={props?.className} />,
  },
  reactjs: {
    label: "ReactJs",
    Icon: (props) => <FaReact className={props?.className} />,
  },
  reactNative: {
    label: "ReactNative",
    Icon: (props) => <FaReact className={props?.className} />,
  },
  php: {
    label: "PHP",
    Icon: (props) => <FaPhp className={props?.className} />,
  },
  sql: {
    label: "SQL",
    Icon: (props) => <FaDatabase className={props?.className} />,
  },
  html: {
    label: "HTML",
    Icon: (props) => <FaHtml5 className={props?.className} />,
  },
  css: {
    label: "CSS",
    Icon: (props) => <FaCss3 className={props?.className} />,
  },
  js: {
    label: "JS",
    Icon: (props) => <FaJs className={props?.className} />,
  },
};
