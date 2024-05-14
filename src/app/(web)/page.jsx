
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import { getContentStructure } from "@/app/(admin)/admin/_private/service/t_content";
import ExperienceTimeLine from '@components/ExperienceTimeLine'
import { BlogList } from './blog/_components/blog'
import ProjectThumbnail from './project/_components/ProjectThumbnail'
import Link from "next/link";
import myLink from "@/link";
import { Button, Divider, List } from "antd";
import { me, technology } from "@/constant";
import { MarkDownView } from "../(admin)/admin/_private/components/Inputs";
import { CgArrowRight } from "react-icons/cg";
export default async function Page() {
  const ls_content_type = await getContentStructure();
  const _project = ls_content_type.find(t => t.name == 'project')
  const _experience = ls_content_type.find(t => t.name == 'experience')
  const _blog = ls_content_type.find(t => t.name == 'blog')
  const project = _project && await getContent({
    where: {
      t_content_id: _project.id,
    }
  })
  const experience = _experience && await getContent({
    where: {
      t_content_id: _experience.id,
    }
  })
  const blog = _blog && await getContent({
    where: {
      t_content_id: _blog.id,
    }
  })

  return (
    <div className="px-8 max-w-xl mx-auto box-border">
      <MarkDownView text={me.about} />
      <Divider />
      <section id='experience' className='py-16'>
        <h2>Exparence</h2>
        <ExperienceTimeLine experience={experience} />
        {/* <Button type='primary' ghost>My Resume</Button> */}
      </section>

      <Divider />
      <section id='projects' className='py-16'>
        <h2>Projects</h2>
        {
          project?.map((p) => <Link href={myLink.project(p.id)} key={p.id}><ProjectThumbnail {...p} /></Link>)
        }
        <div className="text-right"><Link href={myLink.project()}>More Projects<CgArrowRight /> </Link></div>
      </section>

      <Divider />
      <section id='skills' className='p-8 -ml-8 -mr-8 py-16 dotBg'>
        <h2>Skills</h2>
        <div className='flex flex-wrap gap-4'>
          {Object.entries(technology)?.map(([key, { label, Icon }]) => (
            <div key={key} className='flex items-center gap-2 px-2 rounded-md '>
              <Icon className='text-2xl' />{label}
            </div>))}
        </div>
      </section>

      <Divider />
      <section id="blog" className="py-16">
        <h2>Blog</h2>
        <BlogList blogs={blog} />
        <div className="text-right"><Link href={myLink.project()}>More Articles<CgArrowRight /> </Link></div>
      </section>
      <Divider />
      <div className='dotBg h-16' />
      <div className='text-sm opacity-50 font-light'>
        <p>Crafted with passion using <a href='https://nextjs.org' target='_blank'>Next.js</a>, <a href='https://tailwindcss.com/' target='_blank'>Tailwind CSS</a>, and <a href="https://ant.design" target='_blank'>Ant Design</a>. This site showcases my journey and projects. Taking cues from <a href="https://brittanychiang.com/" target='_blank'>Brittany Chiang&apos;s portfolio</a> website layout, I utilized similar concepts as a reference for this design.</p>
        &copy; {(new Date).getFullYear()}
      </div>
    </div>
  )
}
