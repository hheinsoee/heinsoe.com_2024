
'use client'
import React, { useState } from 'react';
import { Button } from "antd";
import { useTheme } from "@/context/theme";
export default async function Home() {
  // const blogs = await getBlog({ limit: 4 });
  const { setDarkMode, isDark } = useTheme()
  //  console.log(blogs)
  return (
    <div className="flex justify-center items-center h-screen ">
      <Button type="primary" onClick={() => setDarkMode(!isDark)}>Primary Button</Button>
    </div>
  );
}




// import React from "react";
// import MDEditor from '@uiw/react-md-editor';

// export default function App() {
//   const [value, setValue] = React.useState(`"**Hello world!!!**"`);
//   return (
//     <div className="container">
//       <MDEditor
//         value={value}
//         onChange={setValue}
//       />
//       <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
//     </div>
//   );
// }

