
'use client'
import { Button, Col, Divider, List, Row, Tag, Timeline } from 'antd';
import React, { useState } from 'react';
import { useTheme } from '@/context/theme';
import Image from 'next/image';
import { FaBraille, FaCalendar, FaSchool } from 'react-icons/fa';
import { Triangle } from '@components/BgPattern'
import Link from 'next/link';
import myLink from '@/link';
import { technology } from '../../constant';
export default function Home() {
  // const blogs = await getBlog({ limit: 4 });
  //  console.log(blogs)
  const { theme } = useTheme();
  return <div className="px-8 max-w-xl mx-auto box-border">
    <p>This is about me. <a href='/'>This is about me.</a> This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me.</p>
    <Divider />
    <section id='experience' className='py-16'>
      <h2>Exparence</h2>
      <Timeline
        items={[
          {
            color: 'green',
            // label: '2015-09-01',
            children: <div>
              <div className='opacity-50'>2023 - current</div>
              <div className='flex gap-1 items-baseline'>
                <h3 className='m-0'>Application Developer</h3>
                <span className='my-2 opacity-50'>at Brain Wave Data</span>
              </div>
              <div className='dark:opacity-70 '>This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me. This is about me.</div>
              <div className='flex gap-1 my-2'>
                {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
                  {technology?.[l]?.Icon()} {l}
                </div>))}
              </div>
            </div>,
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            // dot: <FaBraille style={{ fontSize: '16px' }} />,
            children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
          },
          {
            color: 'gray',
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            // dot: <FaSchool style={{ fontSize: '16px' }} />,
            children: 'Technical testing 2015-09-01',
          },
        ]}
      />
      <Button type='primary' ghost>My Resume</Button>
    </section>
    <Divider />
    <section id='projects' className='py-16'>
      <h2>Projects</h2>
      <div>
        <div className='my-10 flex gap-4'>
          <Image src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width={100} height={100} />
          <div>
            <h3 className='m-0'>Project A</h3>
            <h4 className='my-2 opacity-50'>cms, Social</h4>
            <div className='dark:opacity-70 '>This is about project.</div>
            <div className='flex gap-1 my-2'>
              {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
                {technology?.[l]?.Icon()} {l}
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <Link href={myLink.project()}>More</Link>
    </section>
    <section id='skills' className='p-8 -ml-8 -mr-8 py-16 dotBg'>
      <h2>Skills</h2>
      <div className='flex flex-wrap gap-4'>
        {Object.entries(technology).map(([key, { label, Icon }]) => (
          <div key={key} className='flex items-center gap-2 px-2 rounded-md '>
            <Icon className='text-2xl' />{label}
          </div>))}
      </div>
    </section>
    <section id='blog' className='py-16'>
      <h2>Blogs</h2>
      <div>
        <List>
          <List.Item>
            <div className='flex justify-between flex-1'>
              <div className='flex-1'>
                <div>TItle the title is so long</div>
                <div className='opacity-70 dark:opacity-50 text-xs'>
                  <FaCalendar /> 2024-03-29
                </div>
              </div>

              <Image src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width={100} height={100} />
            </div>
          </List.Item>
          <List.Item>
            <div className='flex-1 flex flex-col justify-between'>
              <div>TItle . TItle the title is so long. TItle the title is so long title is so long</div>
              <div className='opacity-70 dark:opacity-50 text-xs'>
                <FaCalendar /> 2024-03-29
              </div>
            </div>

            <Image />
          </List.Item>
        </List>
      </div>
    </section>
    <Divider />
    <div className='dotBg h-16' />
    <div className='text-sm opacity-50 font-light'>
      <p>Crafted with passion using <a href='https://nextjs.org' target='_blank'>Next.js</a>, <a href='https://tailwindcss.com/' target='_blank'>Tailwind CSS</a>, and <a href="https://ant.design" target='_blank'>Ant Design</a>. This site showcases my journey and projects. Taking cues from <a href="https://brittanychiang.com/" target='_blank'>Brittany Chiang's portfolio</a> website layout, I utilized similar concepts as a reference for this design.</p>
      &copy; {(new Date).getFullYear()}
    </div>
  </div>
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

