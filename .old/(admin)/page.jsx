// 'use client'
// import { JSONTree } from 'react-json-tree';
// import { MyCkEditor } from '@adminComponent/form/MyCkEditor'
// import { QuillEditor } from '@adminComponent/form/quill'
// import { TinyMCEEditor } from '@adminComponent/form/TinyMce'
// import { DraftEditor } from '@adminComponent/form/draftEditor'
// import { useState } from 'react';

export default function Dashboard() {
  // const [a, setA] = useState('<h1>Hello from CKEditor in Next.js!</h1>')
  return (
    <section>
      <div className="flex items-center">
        <h1>Hello Admin</h1>
      </div>
      {/* <div
        className="noBase ck-content"
        dangerouslySetInnerHTML={{ __html: a || "" }}
      /> */}
      {/* <TinyMCEEditor value={a}
        onChange={setA} /> */}
      {/* <MyCkEditor
        value={a}
        onChange={setA}
      /> */}
      {/* <QuillEditor
        value={<h1>Hello from Quill</h1>}
        onChange={setA} /> */}
    </section>

  );
}
