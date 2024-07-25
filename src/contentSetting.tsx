import { PaperClipOutlined } from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { GrProductHunt, GrServices } from "react-icons/gr";

export const contentType = [
  {
    name: "product",
    label: "Products",
    field_list: [
      { name: "logo", label: "Logo", data_type: "image" },
      { name: "released_date", label: "Released Date", data_type: "date" },
      {
        name: "current_version",
        label: "Current Version",
        data_type: "number",
      },
      { name: "client_ids", label: "Clients" },
      { name: "os", label: "Operstion System" },
      { name: "link", label: "Product Link", data_type: "url" },
      { name: "hue", label: "Hue", data_type: "deg" },
    ],
    icon: <GrProductHunt />,
  },
  {
    name: "service",
    label: "Services",
    icon: <GrServices />,
  },
  {
    name: "client",
    label: "Clients",
    field_list: [
      { name: "website_url", label: "Website Url", data_type: "url" },
    ],
    icon: <AiOutlineUser />,
  },
  {
    name: "note",
    label: "Notes",
    field_list: [{ name: "author", label: "Author", data_type: "text" }],
    icon: <FaBlogger />,
  },
  {
    name: "page",
    label: "Pages",
    icon: <PaperClipOutlined />,
  },
];
